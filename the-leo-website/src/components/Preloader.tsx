import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const LETTERS = "THE LEO".split("");

function seen(): boolean {
  try {
    return sessionStorage.getItem("leo-intro") === "1";
  } catch {
    return false;
  }
}

/** One-time opening curtain per session: the mark, the name, a gold rule, then the room. */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !reduce && !seen());

  useEffect(() => {
    if (!show) return;
    const id = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("leo-intro", "1");
      } catch {
        // storage unavailable: the intro simply plays again next time
      }
    }, 1900);
    return () => window.clearTimeout(id);
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.img
            src="/images/mark-gold.png"
            alt=""
            className="h-16 w-16 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="mt-6 flex overflow-hidden font-display text-3xl font-light uppercase tracking-[0.34em] text-cream">
            {LETTERS.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.25 + index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>
          <motion.span
            className="mt-6 h-px bg-gold-2"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
