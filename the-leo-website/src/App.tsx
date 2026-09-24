import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { MobileBar } from "./components/MobileBar";
import { Preloader } from "./components/Preloader";
import { ReserveProvider } from "./components/reserve/ReserveProvider";
import { Home } from "./pages/Home";
import { Story } from "./pages/Story";
import { Menu } from "./pages/Menu";
import { Events } from "./pages/Events";
import { Contact } from "./pages/Contact";

const TITLES: Record<string, string> = {
  "/": "The Leo | Pan-Asian Chophouse in Downtown Markham",
  "/story": "Our Story | The Leo",
  "/menu": "Menu | The Leo",
  "/events": "Private Events | The Leo",
  "/contact": "Visit Us | The Leo",
};

function ScrollAndTitle() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? "The Leo";
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const location = useLocation();
  const reduce = useReducedMotion();
  return (
    <ReserveProvider>
      <div className="min-h-dvh bg-night pb-20 text-cream md:pb-0">
        <Preloader />
        <ScrollProgress className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-gold-2" />
        <ScrollAndTitle />
        <Nav />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main key={location.pathname}>
            {reduce ? null : (
              <motion.div
                className="pointer-events-none fixed inset-0 z-[70] origin-top bg-night"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                style={{ transformOrigin: "top" }}
                aria-hidden="true"
              />
            )}
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<Story />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        <Footer />
        <MobileBar />
      </div>
    </ReserveProvider>
  );
}
