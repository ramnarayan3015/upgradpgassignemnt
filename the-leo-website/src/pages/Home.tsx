import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Magnetic } from "@/components/ui/magnetic";
import { Particles } from "@/components/ui/particles";
import { TextEffect } from "@/components/ui/text-effect";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { Tilt } from "@/components/ui/tilt";
import { AccordionGallery } from "../components/AccordionGallery";
import { ButtonLink } from "../components/Button";
import { EveningJourney } from "../components/EveningJourney";
import { ReserveButton } from "../components/reserve/ReserveButton";
import { ScrollCue } from "../components/ScrollCue";
import { CHEFS, SIGNATURES, SITE } from "../data/site";

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden">
      {reduce ? (
        <img src="/images/art-starry-sky.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/images/art-starry-sky.webp" aria-hidden="true">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/15" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/70 to-transparent" />
      {reduce ? null : <Particles className="absolute inset-0" quantity={70} color="#e2c48f" size={0.6} staticity={35} ease={70} />}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-24 md:px-8 md:pb-20">
        <TextShimmer as="p" className="font-display text-xs uppercase tracking-[0.3em] [--base-color:#a58758] [--base-gradient-color:#f1e5d0]" duration={2.4}>
          Now open in Downtown Markham
        </TextShimmer>
        <TextEffect
          as="h1"
          per="word"
          preset="fade-in-blur"
          delay={0.2}
          speedReveal={1}
          className="mt-5 max-w-4xl font-display text-4xl font-light uppercase leading-[1.02] tracking-[0.06em] md:text-6xl lg:text-7xl"
        >
          Every plate begins with imagination.
        </TextEffect>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-sand md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          Chef Alvin Leung's pan-Asian chophouse, where land meets sea beneath a painted sky.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
        >
          <Magnetic intensity={0.3} range={100}>
            <ReserveButton>Reserve a table</ReserveButton>
          </Magnetic>
          <Magnetic intensity={0.3} range={100}>
            <ButtonLink to="/menu" variant="outline">
              View the menu
            </ButtonLink>
          </Magnetic>
        </motion.div>
        <ScrollCue className="mt-12 hidden md:flex" />
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-32">
      <BlurFade inView delay={0.05}>
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
      </BlurFade>
      <BlurFade inView delay={0.2}>
        <Tilt rotationFactor={5} className="rounded-sm">
          <img src="/images/art-land-sea.webp" alt="Painting of dark earth meeting a cobalt sea in thick brushstrokes" className="aspect-[16/10] w-full rounded-sm object-cover" loading="lazy" />
        </Tilt>
      </BlurFade>
    </section>
  );
}

function Signatures() {
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 md:px-8">
        <BlurFade inView>
          <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">From the flame</h2>
        </BlurFade>
        <BlurFade inView delay={0.1} className="hidden md:block">
          <ButtonLink to="/menu" variant="ghost">
            Full menu <ArrowRight size={16} />
          </ButtonLink>
        </BlurFade>
      </div>
      <div className="mt-10">
        <InfiniteSlider gap={20} speed={38} speedOnHover={10}>
          {SIGNATURES.map((dish) => (
            <Tilt key={dish.title} rotationFactor={7} className="w-[240px] shrink-0 md:w-[300px]">
              <figure>
                <img src={dish.image} alt={dish.title} className="aspect-[3/4] w-full rounded-sm object-cover" loading="lazy" />
                <figcaption className="mt-4">
                  <p className="font-display text-sm uppercase tracking-[0.14em] md:text-base">{dish.title}</p>
                  <p className="mt-1 text-sm text-muted">{dish.caption}</p>
                </figcaption>
              </figure>
            </Tilt>
          ))}
        </InfiniteSlider>
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
      <BlurFade inView className="max-w-2xl">
        <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">Beneath a sky of swirling fire</h2>
        <p className="mt-5 leading-relaxed text-sand/80">
          Sixty-eight seats, an eight-seat bar and two patios in the heart of Downtown Markham. Downstairs the ceiling
          turns to The Starry Night; upstairs, sunflowers. Hover, or tap, to walk through.
        </p>
      </BlurFade>
      <BlurFade inView delay={0.15} className="mt-12">
        <AccordionGallery />
      </BlurFade>
    </section>
  );
}

function Chefs() {
  const [alvin, ...team] = CHEFS;
  return (
    <section className="border-y border-line bg-night-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-32">
        <BlurFade inView>
          <Tilt rotationFactor={4}>
            <img src={alvin!.image} alt={`Chef ${alvin!.name}`} className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" />
          </Tilt>
        </BlurFade>
        <div>
          <BlurFade inView>
            <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">Two culinary visions</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-sand/80">
              Led by the "Demon Chef" Alvin Leung and a kitchen shaped by Toronto's Michelin-starred rooms, The Leo brings
              a new perspective to the classic steakhouse.
            </p>
          </BlurFade>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {[alvin!, ...team].map((chef, index) => (
              <BlurFade key={chef.name} inView delay={index * 0.08}>
                <li className="grid gap-2 py-6 md:grid-cols-[220px_1fr] md:gap-8">
                  <div>
                    <p className="font-display text-lg uppercase tracking-[0.12em]">{chef.name}</p>
                    <p className="text-sm text-gold-2">{chef.role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-sand/80">{chef.bio}</p>
                </li>
              </BlurFade>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink to="/story" variant="ghost">
              Meet the kitchen <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Band() {
  const items = ["Land meets sea", "Pan-Asian chophouse", "Downtown Markham", "Open from 5 pm", "Chef Alvin Leung"];
  return (
    <div className="border-y border-line py-5" aria-hidden="true">
      <InfiniteSlider gap={56} speed={28} reverse>
        {items.map((item) => (
          <span key={item} className="flex items-center gap-14 font-display text-sm uppercase tracking-[0.28em] text-sand/80">
            {item}
            <span className="h-px w-10 bg-gold/60" />
          </span>
        ))}
      </InfiniteSlider>
    </div>
  );
}

function Visit() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
      <BlurFade inView>
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
          <Magnetic intensity={0.3} range={100}>
            <ReserveButton>Reserve a table</ReserveButton>
          </Magnetic>
          <ButtonLink to="/events" variant="outline">
            Private events
          </ButtonLink>
        </div>
      </BlurFade>
      <BlurFade inView delay={0.1}>
        <iframe
          title="Map to The Leo, 162 Enterprise Blvd, Markham"
          src={SITE.mapsEmbed}
          className="aspect-[4/3] w-full rounded-sm border border-line grayscale invert-[0.92] hue-rotate-180 md:aspect-auto md:h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </BlurFade>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <EveningJourney />
      <Signatures />
      <Space />
      <Chefs />
      <Band />
      <Visit />
    </>
  );
}
