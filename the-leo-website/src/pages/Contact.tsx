import { ButtonLink } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { SITE } from "../data/site";

export function Contact() {
  return (
    <>
      <PageHero
        compact
        image="/images/stairs-square.webp"
        alt="The Leo's staircase beneath the sunflower mural"
        title="Find us in Downtown Markham"
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
        <div className="grid gap-10 sm:grid-cols-2">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">Address</p>
            <p className="mt-3 font-display text-xl uppercase tracking-[0.08em]">{SITE.address.area}</p>
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-2 block leading-relaxed text-sand/80 hover:text-cream">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">Hours</p>
            <div className="mt-3 flex flex-col gap-3">
              {SITE.hours.map((slot) => (
                <div key={slot.days}>
                  <p className="text-cream">{slot.days}</p>
                  <p className="text-sm text-sand/70">{slot.time}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">Call us</p>
            <a href={SITE.phoneHref} className="mt-3 block font-display text-xl tracking-[0.06em] text-cream hover:text-gold-2">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="mt-2 block text-sand/80 hover:text-cream">
              {SITE.email}
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">Stay updated</p>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="mt-3 block font-display text-xl tracking-[0.06em] text-cream hover:text-gold-2">
              {SITE.instagramHandle}
            </a>
          </Reveal>
          <Reveal delay={0.2} className="sm:col-span-2">
            <div className="flex flex-wrap gap-3">
              <ButtonLink to={SITE.reserveUrl}>Reserve a table</ButtonLink>
              <ButtonLink to={SITE.mapsUrl} variant="outline">
                Open in Maps
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <iframe
            title="Map to The Leo, 162 Enterprise Blvd, Markham"
            src={SITE.mapsEmbed}
            className="aspect-[4/3] w-full rounded-sm border border-line grayscale invert-[0.92] hue-rotate-180 md:aspect-auto md:h-full md:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </section>
    </>
  );
}
