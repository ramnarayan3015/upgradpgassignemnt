import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../components/Button";
import { Marquee } from "../components/Marquee";
import { Reveal, RevealWords } from "../components/Reveal";
import { CHEFS, SIGNATURES, SITE } from "../data/site";

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 120]);
  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.img
          src="/images/hero-mural.webp"
          alt="The Leo's dining room, with its staircase mural of swirling stars and sunflowers"
          className="h-full w-full object-cover"
          initial={reduce ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/10" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/70 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-24 md:px-8 md:pb-24">
        <h1 className="max-w-4xl font-display text-4xl font-light uppercase leading-[1.02] tracking-[0.06em] md:text-6xl lg:text-7xl">
          <RevealWords text="Every plate begins with imagination." />
        </h1>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-sand md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Chef Alvin Leung's pan-Asian chophouse in Downtown Markham, where land meets sea beneath a painted sky.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <ButtonLink to={SITE.reserveUrl}>Reserve a table</ButtonLink>
          <ButtonLink to="/menu" variant="outline">
            View the menu
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-32">
      <Reveal>
        <p className="font-display text-2xl font-light leading-snug text-cream md:text-4xl">
          Inspired by the meeting of land and sea, every plate is treated as a composition: premium cuts, pristine
          seafood and Asian influences brought together with precision and artistry.
        </p>
        <p className="mt-6 max-w-lg leading-relaxed text-sand/80">
          Rooted in craftsmanship and presented with intention, each dish is a canvas that celebrates flavour, texture
          and the beauty of thoughtful creation.
        </p>
        <div className="mt-8">
          <ButtonLink to="/story" variant="ghost">
            Our story <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="relative">
        <img
          src="/images/lion-painting.webp"
          alt="Painting of a golden lion beneath a swirling starry sky, in the style of Van Gogh"
          className="aspect-square w-full rounded-sm object-cover"
          loading="lazy"
        />
      </Reveal>
    </section>
  );
}

function Signatures() {
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">From the flame</h2>
        </Reveal>
        <Reveal delay={0.1} className="hidden md:block">
          <ButtonLink to="/menu" variant="ghost">
            Full menu <ArrowRight size={16} />
          </ButtonLink>
        </Reveal>
      </div>
      <div className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-8">
        {SIGNATURES.map((dish, index) => (
          <Reveal key={dish.title} delay={index * 0.05} className="snap-start shrink-0">
            <figure className="group w-[72vw] sm:w-[44vw] md:w-[30vw] lg:w-[22vw]">
              <div className="overflow-hidden rounded-sm">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4">
                <p className="font-display text-base uppercase tracking-[0.14em]">{dish.title}</p>
                <p className="mt-1 text-sm text-muted">{dish.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 px-5 md:hidden">
        <ButtonLink to="/menu" variant="ghost">
          Full menu <ArrowRight size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}

function Space() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">
          Beneath a sky of swirling fire
        </h2>
        <p className="mt-5 leading-relaxed text-sand/80">
          Sixty-eight seats, an eight-seat bar and two patios in the heart of Downtown Markham. Downstairs the ceiling
          turns to The Starry Night; upstairs, sunflowers. The mural follows you up the stairs.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
        <Reveal className="md:row-span-2">
          <img src="/images/mural-tall.webp" alt="The staircase beneath the sunflower and starry-sky mural" className="h-full w-full rounded-sm object-cover" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-2">
          <img src="/images/table-wide.webp" alt="A shared table of platters seen from above" className="aspect-[16/9] h-full w-full rounded-sm object-cover" loading="lazy" />
        </Reveal>
        <Reveal delay={0.15}>
          <img src="/images/stairs-square.webp" alt="Sunflower mural along the stairs" className="aspect-square h-full w-full rounded-sm object-cover" loading="lazy" />
        </Reveal>
        <Reveal delay={0.2}>
          <img src="/images/bar-tall.webp" alt="The eight-seat bar under the mural" className="aspect-square h-full w-full rounded-sm object-cover" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

function Chefs() {
  const [alvin, ...team] = CHEFS;
  return (
    <section className="border-y border-line bg-night-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-32">
        <Reveal>
          <img src={alvin!.image} alt={`Chef ${alvin!.name}`} className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">Two culinary visions</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-sand/80">
              Led by the "Demon Chef" Alvin Leung and a kitchen shaped by Toronto's Michelin-starred rooms, The Leo brings
              a new perspective to the classic steakhouse.
            </p>
          </Reveal>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {[alvin!, ...team].map((chef, index) => (
              <Reveal key={chef.name} delay={index * 0.08}>
                <li className="grid gap-2 py-6 md:grid-cols-[220px_1fr] md:gap-8">
                  <div>
                    <p className="font-display text-lg uppercase tracking-[0.12em]">{chef.name}</p>
                    <p className="text-sm text-gold-2">{chef.role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-sand/80">{chef.bio}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
      <Reveal>
        <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">Visit</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">Find us</p>
            <p className="mt-3 text-cream">{SITE.address.area}</p>
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-1 block text-sand/80 hover:text-cream">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </a>
            <a href={SITE.phoneHref} className="mt-3 block text-sand/80 hover:text-cream">
              {SITE.phone}
            </a>
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">Hours</p>
            <div className="mt-3 flex flex-col gap-3">
              {SITE.hours.map((slot) => (
                <div key={slot.days}>
                  <p className="text-cream">{slot.days}</p>
                  <p className="text-sm text-sand/70">{slot.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to={SITE.reserveUrl}>Reserve a table</ButtonLink>
          <ButtonLink to="/events" variant="outline">
            Private events
          </ButtonLink>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <iframe
          title="Map to The Leo, 162 Enterprise Blvd, Markham"
          src={SITE.mapsEmbed}
          className="aspect-[4/3] w-full rounded-sm border border-line grayscale invert-[0.92] hue-rotate-180 md:aspect-auto md:h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </Reveal>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Signatures />
      <Space />
      <Chefs />
      <Marquee items={["Land meets sea", "Pan-Asian chophouse", "Downtown Markham", "Open from 5 pm", "Chef Alvin Leung"]} />
      <Visit />
    </>
  );
}
