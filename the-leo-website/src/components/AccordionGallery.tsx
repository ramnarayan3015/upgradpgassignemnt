import { useState } from "react";
import { ROOM_GALLERY } from "../data/site";

/** Hover-expanding strips of the room. On touch screens, tap a strip to open it. */
export function AccordionGallery() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex h-[60vh] min-h-[420px] w-full flex-col gap-2 md:h-[70vh] md:flex-row" role="list">
      {ROOM_GALLERY.map((item, index) => {
        const open = index === active;
        return (
          <button
            key={item.image}
            type="button"
            role="listitem"
            aria-expanded={open}
            aria-label={item.title}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            className={`group relative min-h-0 cursor-pointer overflow-hidden rounded-sm transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "flex-[5]" : "flex-[1]"
            }`}
          >
            <img
              src={item.image}
              alt={item.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${open ? "scale-100" : "scale-110"}`}
              loading="lazy"
            />
            <div className={`absolute inset-0 transition-opacity duration-500 ${open ? "bg-night/10" : "bg-night/55 group-hover:bg-night/35"}`} />
            <span
              className={`absolute bottom-4 left-4 font-display text-sm uppercase tracking-[0.22em] text-cream transition-opacity duration-500 md:bottom-6 md:left-6 md:text-base ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.title}
            </span>
            <span
              className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-display text-[11px] uppercase tracking-[0.28em] text-cream/70 transition-opacity duration-300 md:block ${
                open ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
            >
              {item.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
