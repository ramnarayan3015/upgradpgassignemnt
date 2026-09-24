import { useMemo, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { MENU, type Dish, type DishTag, type MenuSection } from "../data/site";

const FILTERS: { id: DishTag | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "signature", label: "Signatures" },
  { id: "land", label: "Land" },
  { id: "sea", label: "Sea" },
  { id: "vegetarian", label: "Vegetarian" },
];

const ART = ["/images/art-impasto-fire.webp", "/images/art-starry-sky.webp", "/images/art-land-sea.webp"];

function artFor(dish: Dish): string {
  if (dish.tags?.includes("sea")) return ART[2]!;
  if (dish.tags?.includes("vegetarian")) return ART[1]!;
  return ART[0]!;
}

interface HoverMenuProps {
  sections: MenuSection[];
  onActiveSection?: (id: string) => void;
}

/** Menu list whose lines summon a floating painted card that follows the pointer. */
export function HoverMenu({ sections }: HoverMenuProps) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<DishTag | "all">("all");
  const [hovered, setHovered] = useState<Dish | null>(null);
  const [tapped, setTapped] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });
  const listRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        items: filter === "all" ? section.items : section.items.filter((dish) => dish.tags?.includes(filter)),
      })),
    [sections, filter],
  );
  const total = visible.reduce((sum, section) => sum + section.items.length, 0);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    x.set(event.clientX + 24);
    y.set(event.clientY - 90);
  };

  return (
    <div ref={listRef} onMouseMove={reduce ? undefined : onMove} className="relative">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter the menu">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={`cursor-pointer rounded-full border px-4 py-2 font-display text-[12px] uppercase tracking-[0.18em] transition-colors ${
              filter === item.id ? "border-gold-2 bg-gold-2 text-night" : "border-line text-cream/75 hover:border-cream/60"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {total === 0 ? "Nothing matches that filter yet." : `${total} ${total === 1 ? "dish" : "dishes"}`}
      </p>

      <div className="mt-12 flex flex-col gap-20">
        {visible.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-40 grid gap-8 md:grid-cols-[240px_1fr]">
            <h2 className="font-display text-3xl font-light uppercase tracking-[0.1em] md:sticky md:top-40">{section.title}</h2>
            <div>
              {section.note ? <p className="max-w-2xl leading-relaxed text-sand/80">{section.note}</p> : null}
              {section.items.length > 0 ? (
                <ul className={`divide-y divide-line ${section.note ? "mt-8" : ""}`}>
                  {section.items.map((dish) => {
                    const open = tapped === dish.name;
                    return (
                      <li
                        key={dish.name}
                        onMouseEnter={() => setHovered(dish)}
                        onMouseLeave={() => setHovered((current) => (current?.name === dish.name ? null : current))}
                      >
                        <button
                          type="button"
                          aria-expanded={open}
                          onClick={() => setTapped((current) => (current === dish.name ? null : dish.name))}
                          className="group flex w-full cursor-pointer items-baseline justify-between gap-6 py-5 text-left"
                        >
                          <span className="min-w-0">
                            <span className="block font-display text-lg uppercase tracking-[0.1em] transition-colors group-hover:text-gold-2">{dish.name}</span>
                            <span className="mt-1 block text-sm text-sand/70">{dish.description}</span>
                          </span>
                          {dish.price != null ? (
                            <span className="shrink-0 font-display text-lg tabular-nums text-gold-2">{dish.price}</span>
                          ) : null}
                        </button>
                        <AnimatePresence initial={false}>
                          {open ? (
                            <motion.div
                              className="overflow-hidden md:hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="mb-5 flex items-center gap-4 rounded-sm border border-line bg-night-2 p-3">
                                <div className="h-16 w-16 shrink-0 rounded-sm bg-cover bg-center" style={{ backgroundImage: `url(${artFor(dish)})` }} />
                                <p className="text-sm text-sand/80">
                                  {dish.tags?.includes("signature") ? "A house signature. " : ""}
                                  Made to share. Ask about allergies and we will guide you.
                                </p>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              ) : section.items.length === 0 && filter === "all" ? (
                <p className="mt-6 text-sm text-muted">Today's selection is shared at the table and changes with the season.</p>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      {reduce ? null : (
        <AnimatePresence>
          {hovered ? (
            <motion.div
              key={hovered.name}
              className="pointer-events-none fixed left-0 top-0 z-30 hidden w-56 md:block"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
            >
              <div className="overflow-hidden rounded-sm border border-gold/40 shadow-2xl">
                <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${artFor(hovered)})` }} />
                <div className="bg-night-2 px-4 py-3">
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-gold-2">
                    {hovered.tags?.includes("signature") ? "House signature" : "Made to share"}
                  </p>
                  <p className="mt-1 text-sm text-cream">{hovered.name}</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </div>
  );
}

export { MENU as DEFAULT_MENU };
