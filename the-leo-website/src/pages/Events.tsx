import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { EVENT_TYPES, SITE } from "../data/site";

interface Inquiry {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  type: string;
  message: string;
}

const EMPTY: Inquiry = { name: "", email: "", phone: "", date: "", guests: "", type: "", message: "" };

const field =
  "w-full rounded-sm border border-line bg-night px-4 py-3 text-cream placeholder:text-muted/70 transition-colors focus:border-gold-2 focus:outline-none";

export function Events() {
  const [form, setForm] = useState<Inquiry>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof Inquiry) => (event: { target: { value: string } }) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Tell us who to reply to.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = "Enter an email address we can reach you at.";
    if (!form.type) next.type = "Choose the kind of event.";
    if (!form.guests || Number(form.guests) < 1) next.guests = "How many guests are you expecting?";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0]!;
      document.getElementById(`field-${first}`)?.focus();
      return;
    }
    const subject = encodeURIComponent(`Event inquiry: ${form.type} for ${form.guests} guests`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "not provided"}`,
        `Preferred date: ${form.date || "flexible"}`,
        `Guests: ${form.guests}`,
        `Event type: ${form.type}`,
        "",
        form.message,
      ].join("\n"),
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <PageHero
        image="/images/table-hands.webp"
        alt="Guests sharing platters at a long table"
        title="Gather at The Leo"
        intro="Private space bookings, customised menus and tailored dining experiences for gatherings of all kinds."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1fr_1.2fr] md:px-8 md:py-32">
        <div className="flex flex-col gap-8">
          <Reveal>
            <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">Host your next event</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-sand/80">
              Inspired by creativity and crafted with intention, The Leo provides an unforgettable backdrop for
              gatherings of all kinds, paired with expressive cuisine and exceptional service. Our team will work with
              you to create a seamless celebration designed around your occasion.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src="/images/table-wide.webp" alt="A table of shared platters at The Leo" className="aspect-[4/3] w-full rounded-sm object-cover" loading="lazy" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm text-muted">
              Prefer to talk? Call{" "}
              <a href={SITE.phoneHref} className="text-cream underline underline-offset-4">
                {SITE.phone}
              </a>{" "}
              or write to{" "}
              <a href={`mailto:${SITE.email}`} className="text-cream underline underline-offset-4">
                {SITE.email}
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="flex flex-col gap-6 rounded-sm border border-line bg-night-2 p-6 md:p-10">
            <fieldset>
              <legend className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">What type of event are you hosting?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={form.type === type}
                    onClick={() => {
                      setForm((current) => ({ ...current, type }));
                      setErrors((current) => ({ ...current, type: undefined }));
                    }}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                      form.type === type ? "border-gold-2 bg-gold-2 text-night" : "border-line text-cream/80 hover:border-cream/60"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.type ? <p className="mt-2 text-sm text-ember">{errors.type}</p> : null}
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span>Name</span>
                <input id="field-name" className={field} value={form.name} onChange={update("name")} autoComplete="name" required />
                {errors.name ? <span className="text-ember">{errors.name}</span> : null}
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Email</span>
                <input id="field-email" type="email" className={field} value={form.email} onChange={update("email")} autoComplete="email" required />
                {errors.email ? <span className="text-ember">{errors.email}</span> : null}
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Phone (optional)</span>
                <input id="field-phone" type="tel" className={field} value={form.phone} onChange={update("phone")} autoComplete="tel" />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Preferred date</span>
                <input id="field-date" type="date" className={field} value={form.date} onChange={update("date")} />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span>Guests</span>
                <input id="field-guests" type="number" min={1} inputMode="numeric" className={field} value={form.guests} onChange={update("guests")} required />
                {errors.guests ? <span className="text-ember">{errors.guests}</span> : null}
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm">
              <span>Tell us about the occasion</span>
              <textarea id="field-message" rows={4} className={field} value={form.message} onChange={update("message")} />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit">Submit inquiry</Button>
              <p className="text-xs text-muted">Opens your email app with the details filled in. We reply within two business days.</p>
            </div>
            {sent ? (
              <p role="status" className="rounded-sm border border-gold/40 bg-night px-4 py-3 text-sm text-cream">
                Your email app should now be open with your inquiry. If it didn't open, write to {SITE.email}.
              </p>
            ) : null}
          </form>
        </Reveal>
      </section>
    </>
  );
}
