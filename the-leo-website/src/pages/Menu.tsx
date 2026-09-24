import { useEffect, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Lens } from "@/components/ui/lens";
import { ButtonLink } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { MENU, SITE, TASTING_MENU } from "../data/site";

export function Menu() {
  const [active, setActive] = useState(MENU[0]!.id);

  useEffect(() => {
    const ids = MENU.map((section) => section.id);
    const onScroll = () => {
      const marker = window.innerHeight * 0.35;
      let current = ids[0]!;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <PageHero
        compact
        image="/images/starry-texture.webp"
        alt="Close-up of The Leo's swirling blue ceiling mural"
        title="The menu"
        intro="Shared plates, premium cuts and the day's catch, finished over the flame. Prices in Canadian dollars."
      />

      <div className="sticky top-16 z-30 border-y border-line bg-night/90 backdrop-blur-md md:top-[72px]">
        <nav className="scrollbar-none mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 md:px-8" aria-label="Menu sections">
          {MENU.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`shrink-0 border-b-2 py-4 font-display text-[13px] uppercase tracking-[0.18em] transition-colors ${
                active === section.id ? "border-gold-2 text-gold-2" : "border-transparent text-cream/60 hover:text-cream"
              }`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <section className="my-16 grid gap-8 md:grid-cols-[1fr_380px] md:items-stretch">
          <BlurFade inView className="relative">
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-sm border border-line bg-night-2 p-8 md:p-10">
              <BorderBeam size={220} duration={9} colorFrom="#a58758" colorTo="#f1e5d0" borderWidth={1.5} />
              <div>
                <h2 className="font-display text-2xl uppercase tracking-[0.14em] md:text-3xl">{TASTING_MENU.title}</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-sand/80">{TASTING_MENU.description}</p>
              </div>
              <p className="font-display text-4xl font-light text-gold-2 md:text-5xl">
                <span className="align-top text-2xl">$</span>
                {TASTING_MENU.price}
                <span className="ml-2 text-sm uppercase tracking-[0.18em] text-sand/70">per guest</span>
              </p>
            </div>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Lens zoomFactor={1.8} lensSize={200}>
              <img src="/images/chili-crab-wide.webp" alt="Singapore chili crab, hover to zoom" className="aspect-[4/3] w-full rounded-sm object-cover md:aspect-auto md:h-full" loading="lazy" />
            </Lens>
          </BlurFade>
        </section>

        <div className="flex flex-col gap-20 pb-24 md:pb-32">
          {MENU.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-40 grid gap-8 md:grid-cols-[240px_1fr]">
              <BlurFade inView>
                <h2 className="font-display text-3xl font-light uppercase tracking-[0.1em] md:sticky md:top-40">{section.title}</h2>
              </BlurFade>
              <div>
                {section.note ? (
                  <BlurFade inView>
                    <p className="max-w-2xl leading-relaxed text-sand/80">{section.note}</p>
                  </BlurFade>
                ) : null}
                {section.items.length > 0 ? (
                  <ul className={`divide-y divide-line ${section.note ? "mt-8" : ""}`}>
                    {section.items.map((dish, index) => (
                      <BlurFade key={dish.name} inView delay={index * 0.04}>
                        <li className="flex items-baseline justify-between gap-6 py-5">
                          <div>
                            <p className="font-display text-lg uppercase tracking-[0.1em]">{dish.name}</p>
                            <p className="mt-1 text-sm text-sand/70">{dish.description}</p>
                          </div>
                          {dish.price != null ? (
                            <p className="shrink-0 font-display text-lg tabular-nums text-gold-2">{dish.price}</p>
                          ) : null}
                        </li>
                      </BlurFade>
                    ))}
                  </ul>
                ) : (
                  <BlurFade inView>
                    <p className="mt-6 text-sm text-muted">Today's selection is shared at the table and changes with the season.</p>
                  </BlurFade>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="border-t border-line bg-night-2">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="max-w-xl font-display text-xl font-light uppercase tracking-[0.08em] md:text-2xl">
            Dishes are designed to share. Tell us about allergies and we will guide you.
          </p>
          <ButtonLink to={SITE.reserveUrl}>Reserve a table</ButtonLink>
        </div>
      </section>
    </>
  );
}
