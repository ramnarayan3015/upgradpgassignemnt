import { motion, useReducedMotion } from "motion/react";

export function ScrollCue({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.3em] text-cream/60 ${className}`} aria-hidden="true">
      <span className="relative h-10 w-px overflow-hidden bg-cream/20">
        <motion.span
          className="absolute inset-x-0 top-0 h-4 bg-gold-2"
          animate={reduce ? undefined : { y: ["-100%", "250%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      Scroll
    </div>
  );
}
