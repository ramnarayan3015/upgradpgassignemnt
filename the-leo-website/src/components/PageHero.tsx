import { motion, useReducedMotion } from "motion/react";
import { TextEffect } from "@/components/ui/text-effect";

interface PageHeroProps {
  image: string;
  alt: string;
  title: string;
  intro?: string;
  compact?: boolean;
}

/** Inner-page opener: full-bleed photo with a slow settle and a rising title. */
export function PageHero({ image, alt, title, intro, compact }: PageHeroProps) {
  const reduce = useReducedMotion();
  return (
    <section className={`relative flex items-end overflow-hidden ${compact ? "min-h-[56vh]" : "min-h-[72vh]"}`}>
      <motion.img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/20" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/80 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pb-20">
        <TextEffect
          as="h1"
          per="word"
          preset="fade-in-blur"
          speedReveal={1.1}
          className="font-display text-4xl font-light uppercase tracking-[0.08em] leading-[1.05] md:text-6xl"
        >
          {title}
        </TextEffect>
        {intro ? (
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-sand md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {intro}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
