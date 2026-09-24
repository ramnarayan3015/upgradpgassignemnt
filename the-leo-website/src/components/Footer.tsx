import { Link } from "react-router-dom";
import { SITE } from "../data/site";
import { ReserveButton } from "./reserve/ReserveButton";

export function Footer() {
  return (
    <footer className="border-t border-line bg-night-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/mark-gold.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
            <div>
              <p className="font-display text-xl uppercase tracking-[0.22em]">The Leo</p>
              <p className="text-sm text-muted">Seafood &amp; Chop House</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-sand/80">
            A pan-Asian chophouse in Downtown Markham, where premium cuts and pristine seafood meet the flame beneath a
            swirling, painted sky.
          </p>
          <div>
            <ReserveButton>Reserve a table</ReserveButton>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">Visit</p>
          <p className="text-cream">{SITE.address.area}</p>
          <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="text-sand/80 hover:text-cream">
            {SITE.address.line1}
            <br />
            {SITE.address.line2}
          </a>
          <a href={SITE.phoneHref} className="text-sand/80 hover:text-cream">
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="text-sand/80 hover:text-cream">
            {SITE.email}
          </a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" className="text-sand/80 hover:text-cream">
            {SITE.instagramHandle}
          </a>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-gold-2">Hours</p>
          {SITE.hours.map((slot) => (
            <div key={slot.days}>
              <p className="text-cream">{slot.days}</p>
              <p className="text-sand/70">{slot.time}</p>
            </div>
          ))}
          <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-display text-xs uppercase tracking-[0.18em] text-sand/70" aria-label="Footer">
            <Link to="/story" className="hover:text-cream">Story</Link>
            <Link to="/menu" className="hover:text-cream">Menu</Link>
            <Link to="/events" className="hover:text-cream">Events</Link>
            <Link to="/contact" className="hover:text-cream">Contact</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-muted md:px-8">
          {new Date().getFullYear()} The Leo Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
