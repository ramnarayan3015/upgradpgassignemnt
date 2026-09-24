import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
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
  return (
    <div className="min-h-dvh bg-night text-cream">
      <ScrollProgress className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-gold-2" />
      <ScrollAndTitle />
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
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
    </div>
  );
}
