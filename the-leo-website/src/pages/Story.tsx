import { ButtonLink } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CHEFS, SITE } from "../data/site";

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

export function Story() {
  return (
    <>
      <PageHero
        image="/images/pass-wide.webp"
        alt="Hands plating a dish at The Leo's kitchen pass"
        title="Where hunger meets masterpiece"
        intro="A pan-Asian chophouse built on obsession, artistry and the meeting of land and sea."
      />

      <section className="relative overflow-hidden border-y border-line">
        <img src="/images/flame.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/70 to-night" />
        <div className="relative mx-auto max-w-5xl px-5 py-24 md:px-8 md:py-36">
          <Reveal>
            <p className="font-display text-2xl font-light uppercase leading-[1.25] tracking-[0.06em] text-cream md:text-4xl lg:text-5xl">
              {MANIFESTO}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
        <Reveal>
          <img src="/images/lion-painting.webp" alt="Painting of a golden lion beneath a swirling starry sky" className="aspect-square w-full rounded-sm object-cover" loading="lazy" />
        </Reveal>
        <Reveal delay={0.1}>
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
        </Reveal>
      </section>

      <section className="border-t border-line bg-night-2">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <Reveal>
            <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">The kitchen</h2>
          </Reveal>
          <div className="mt-12 flex flex-col gap-16">
            {CHEFS.map((chef, index) => (
              <Reveal key={chef.name} delay={0.05}>
                <article className={`grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <img src={chef.image} alt={`Chef ${chef.name}`} className="aspect-[4/5] w-full max-w-md rounded-sm object-cover" loading="lazy" />
                  <div>
                    <p className="text-sm text-gold-2">{chef.role}</p>
                    <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.12em] md:text-3xl">{chef.name}</h3>
                    <p className="mt-5 max-w-xl leading-relaxed text-sand/80">{chef.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <img src="/images/cocktail-pour.webp" alt="A cocktail being finished at the bar" className="aspect-[3/4] w-full rounded-sm object-cover" loading="lazy" />
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-light uppercase tracking-[0.08em] md:text-5xl">How the evening unfolds</h2>
            </Reveal>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {COURSES.map((course, index) => (
                <Reveal key={course.title} delay={index * 0.08}>
                  <li className="py-7">
                    <h3 className="font-display text-xl uppercase tracking-[0.14em]">{course.title}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-sand/80">{course.text}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/menu">See the menu</ButtonLink>
              <ButtonLink to={SITE.reserveUrl} variant="outline">
                Reserve a table
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
