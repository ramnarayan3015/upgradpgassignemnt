import { BlurFade } from "@/components/ui/blur-fade";
import { TextReveal } from "@/components/ui/text-reveal";
import { Timeline } from "@/components/ui/timeline";
import { ButtonLink } from "../components/Button";
import { ParallaxArt } from "../components/ParallaxArt";
import { ReserveButton } from "../components/reserve/ReserveButton";
import { PageHero } from "../components/PageHero";
import { CHEFS } from "../data/site";

const MANIFESTO =
  "Beneath a sky of swirling, impasto fire, our namesake lion stands as a testament to the untamed passion of the brushstroke. Inspired by the intensity of an art museum and the fevered, beautiful devotion of Van Gogh, we bring that same kinetic energy to the kitchen. Here, the flame is not merely a tool, but an expression: a bold, textured tribute to a feast where hunger meets masterpiece.";

const COURSES = [
  {
    title: "Appetizers",
    text: "Every great meal begins with anticipation. Our shareable starters are thoughtfully crafted to set the tone for the experience ahead, where every first bite is as memorable as the last.",
  },
  {
    title: "Main dishes",
    text: "Flavourful, expressive and thoughtfully composed, each main is crafted to be the centrepiece of the table and the moment you'll remember long after the last bite.",
  },
  {
    title: "Cocktails",
    text: "From timeless classics to imaginative signatures, our cocktails are crafted to complement the evening and lift every toast, celebration and shared moment.",
  },
];

const JOURNEY = [
  {
    title: "Hong Kong",
    content: (
      <div className="grid gap-6 md:grid-cols-[1fr_260px]">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.12em] text-cream">The Demon Chef</p>
          <p className="mt-3 leading-relaxed text-sand/80">
            Alvin Leung earns two Michelin stars at Bo Innovation, his "X-treme Chinese" kitchen in Hong Kong, and a
            reputation for challenging convention on every plate.
          </p>
        </div>
        <img src="/images/chef-kitchen.webp" alt="A chef at work in The Leo's kitchen" className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" />
      </div>
    ),
  },
  {
    title: "Canada",
    content: (
      <div className="grid gap-6 md:grid-cols-[1fr_260px]">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.12em] text-cream">A familiar face</p>
          <p className="mt-3 leading-relaxed text-sand/80">
            As a judge on MasterChef Canada, Alvin becomes one of the country's best-known chefs, and starts imagining a
            steakhouse that doesn't take tradition too literally.
          </p>
        </div>
        <img src="/images/lion-painting.webp" alt="The Leo's lion painting beneath a swirling sky" className="aspect-square w-full rounded-sm object-cover" loading="lazy" />
      </div>
    ),
  },
  {
    title: "Markham, 2026",
    content: (
      <div className="grid gap-6 md:grid-cols-[1fr_260px]">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.12em] text-cream">The Leo opens</p>
          <p className="mt-3 leading-relaxed text-sand/80">
            Sixty-eight seats beneath a Van Gogh-inspired mural at 162 Enterprise Boulevard. Land meets sea, shared
            family-style, with Executive Chef Edan Lister-Stevens and Chef de Cuisine Caleb Eisenberg in the kitchen.
          </p>
        </div>
        <img src="/images/table-tall.webp" alt="A shared table of dishes at The Leo" className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" />
      </div>
    ),
  },
];

export function Story() {
  return (
    <>
      <PageHero
        image="/images/art-starry-sky.webp"
        alt="A painted starry sky in thick cobalt and gold brushstrokes"
        title="Where hunger meets masterpiece"
        intro="A pan-Asian chophouse built on obsession, artistry and the meeting of land and sea."
      />

      <section className="relative border-y border-line">
        <img src="/images/art-impasto-fire.webp" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night via-night/60 to-night" />
        <div className="relative">
          <TextReveal className="font-display uppercase tracking-[0.04em] text-cream">{MANIFESTO}</TextReveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
        <BlurFade inView>
          <ParallaxArt />
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">Two culinary visions</h2>
          <p className="mt-6 leading-relaxed text-sand/80">
            At the intersection of obsession and artistry, two culinary visions come together. Led by iconoclastic Chef
            Alvin Leung, the "Demon Chef" known for challenging convention, and Executive Chef Edan Lister-Stevens, whose
            precision and creativity shape the kitchen, The Leo brings a new perspective to the classic steakhouse.
          </p>
          <p className="mt-4 leading-relaxed text-sand/80">
            Together they build a menu around premium ingredients, thoughtful technique, and an approach that doesn't
            take tradition too literally.
          </p>
        </BlurFade>
      </section>

      <section className="border-t border-line bg-night-2">
        <Timeline data={JOURNEY} />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <BlurFade inView>
          <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">The kitchen</h2>
        </BlurFade>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {CHEFS.map((chef, index) => (
            <BlurFade key={chef.name} inView delay={index * 0.08}>
              <li className="grid gap-2 py-7 md:grid-cols-[280px_1fr] md:gap-8">
                <div>
                  <p className="font-display text-xl uppercase tracking-[0.12em]">{chef.name}</p>
                  <p className="text-sm text-gold-2">{chef.role}</p>
                </div>
                <p className="max-w-2xl leading-relaxed text-sand/80">{chef.bio}</p>
              </li>
            </BlurFade>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-night-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-32">
          <BlurFade inView>
            <img src="/images/chef-grill.webp" alt="A chef working the grill at The Leo" className="aspect-[4/5] w-full rounded-sm object-cover" loading="lazy" />
          </BlurFade>
          <div>
            <BlurFade inView>
              <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">How the evening unfolds</h2>
            </BlurFade>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {COURSES.map((course, index) => (
                <BlurFade key={course.title} inView delay={index * 0.08}>
                  <li className="py-7">
                    <h3 className="font-display text-xl uppercase tracking-[0.14em]">{course.title}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-sand/80">{course.text}</p>
                  </li>
                </BlurFade>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/menu">See the menu</ButtonLink>
              <ReserveButton variant="outline">Reserve a table</ReserveButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
