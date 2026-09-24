import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Magnetic } from "@/components/ui/magnetic";
import { Menu as MenuIcon, X } from "lucide-react";
import { SITE } from "../data/site";
import { ReserveButton } from "./reserve/ReserveButton";
import { TonightPill } from "./TonightPill";

const LINKS = [
  { to: "/story", label: "Story" },
  { to: "/menu", label: "Menu" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-night/80 via-night/35 to-transparent md:bg-none"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label="The Leo, home">
          <img src="/images/mark-gold.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="font-display text-lg font-medium uppercase tracking-[0.22em] text-cream">The Leo</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display text-[13px] uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-gold-2" : "text-cream/75 hover:text-cream"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <TonightPill className="ml-2 hidden lg:inline-flex" />
          <Magnetic intensity={0.25} range={80}>
            <ReserveButton variant="compact" className="ml-2">
              Reserve
            </ReserveButton>
          </Magnetic>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-night/55 text-cream shadow-lg backdrop-blur-md transition-colors hover:border-cream/50 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

    </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-night px-6 pb-10 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col divide-y divide-line">
              {[{ to: "/", label: "Home" }, ...LINKS].map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-5 font-display text-3xl font-light uppercase tracking-[0.12em] ${
                        isActive ? "text-gold-2" : "text-cream"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-4">
              <ReserveButton>Reserve a table</ReserveButton>
              <a href={SITE.phoneHref} className="text-center font-display text-sm uppercase tracking-[0.18em] text-cream/70">
                {SITE.phone}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
