import { useState, type FormEvent } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";
import { Spotlight } from "@/components/ui/spotlight-new";
import { ChevronDown } from "lucide-react";
import { Button } from "../components/Button";
import { PageHero } from "../components/PageHero";
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

const FAQ = [
  {
    q: "How many guests can you host?",
    a: "The dining room seats 68, with an eight-seat bar and patios on both levels. Full buyouts are available for larger celebrations.",
  },
  {
    q: "Can the menu be customised?",
    a: "Yes. Our team builds a shared, family-style menu around your occasion, dietary needs and budget, from starters through dessert.",
  },
  {
    q: "How far ahead should we book?",
    a: "The earlier the better, especially for Friday and Saturday evenings and the holiday season. Send the inquiry and we will confirm availability within two business days.",
  },
  {
    q: "Is there a minimum spend?",
    a: "Minimums depend on the space, the day and the size of your party. We will share them with your first quote so there are no surprises.",
  },
];

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
          <BlurFade inView>
            <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">Host your next event</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-sand/80">
              Inspired by creativity and crafted with intention, The Leo provides an unforgettable backdrop for
              gatherings of all kinds, paired with expressive cuisine and exceptional service. Our team will work with
              you to create a seamless celebration designed around your occasion.
            </p>
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <img src="/images/art-sunflowers.webp" alt="Sunflowers painted in thick impasto brushstrokes" className="aspect-[4/5] w-full max-w-sm rounded-sm object-cover" loading="lazy" />
          </BlurFade>
          <BlurFade inView delay={0.15}>
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
          </BlurFade>
        </div>

        <BlurFade inView delay={0.1}>
          <form onSubmit={submit} noValidate className="relative flex flex-col gap-6 overflow-hidden rounded-sm border border-line bg-night-2 p-6 md:p-10">
            <Spotlight
              gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(40, 45%, 60%, .12) 0, hsla(40, 45%, 50%, .04) 50%, hsla(40, 45%, 40%, 0) 80%)"
              gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(40, 45%, 60%, .08) 0, hsla(40, 45%, 50%, .03) 80%, transparent 100%)"
              gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(40, 45%, 60%, .06) 0, hsla(40, 45%, 40%, .02) 80%, transparent 100%)"
              width={420}
              height={900}
              smallWidth={160}
              translateY={-200}
              duration={8}
            />
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
        </BlurFade>
      </section>

      <section className="border-t border-line bg-night-2">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.4fr] md:px-8 md:py-28">
          <BlurFade inView>
            <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">Good to know</h2>
            <p className="mt-5 max-w-md leading-relaxed text-sand/80">
              The short version of what most hosts ask us first. Everything else, we will work out together.
            </p>
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <Accordion className="flex w-full flex-col divide-y divide-line border-y border-line" transition={{ duration: 0.25, ease: "easeOut" }}>
              {FAQ.map((item) => (
                <AccordionItem key={item.q} value={item.q} className="py-4">
                  <AccordionTrigger className="w-full cursor-pointer text-left">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-base uppercase tracking-[0.12em] text-cream">{item.q}</span>
                      <ChevronDown size={18} className="shrink-0 text-gold-2 transition-transform duration-200 group-data-expanded:rotate-180" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pt-3 max-w-2xl leading-relaxed text-sand/80">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
