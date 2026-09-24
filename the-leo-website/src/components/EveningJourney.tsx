import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { EVENING } from "../data/site";
import { ReserveButton } from "./reserve/ReserveButton";

/** Scroll-pinned journey: four scenes crossfade while the page scrolls four screens. */
export function EveningJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(EVENING.length - 1, Math.max(0, Math.floor(value * EVENING.length)));
    if (next !== active) setActive(next);
  });
  const scene = EVENING[active]!;

  return (
    <section ref={ref} className="relative" style={{ height: `${EVENING.length * 100}vh` }} aria-label="An evening at The Leo">
      <div className="sticky top-0 h-dvh overflow-hidden">
        {EVENING.map((item, index) => (
          <motion.img
            key={item.key}
            src={item.image}
            alt={item.alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{ opacity: index === active ? 1 : 0, scale: reduce ? 1 : index === active ? 1 : 1.08 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-night/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-20 md:items-center md:px-8 md:pb-0">
          <div className="grid w-full gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-xl">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-2">An evening at The Leo</p>
              <div className="relative mt-4 min-h-[13rem] md:min-h-[15rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scene.key}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="font-display text-5xl font-light uppercase tracking-[0.08em] md:text-7xl">{scene.title}</h2>
                    <p className="mt-5 max-w-md leading-relaxed text-sand md:text-lg">{scene.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-6">
                <ReserveButton variant="outline">Start your evening</ReserveButton>
              </div>
            </div>

            <ol className="flex gap-3 md:flex-col md:gap-4" aria-label="Scenes">
              {EVENING.map((item, index) => (
                <li key={item.key} className="flex items-center gap-3">
                  <span className={`h-px transition-all duration-500 md:h-px ${index === active ? "w-10 bg-gold-2" : "w-5 bg-cream/30"}`} aria-hidden="true" />
                  <span className={`hidden font-display text-[11px] uppercase tracking-[0.24em] transition-colors md:inline ${index === active ? "text-cream" : "text-cream/40"}`}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
