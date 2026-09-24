import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Particles } from "@/components/ui/particles";

/** The lion under the stars: layers drift with the pointer, stars float behind. */
export function ParallaxArt() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const lionX = useTransform(sx, [-1, 1], [-14, 14]);
  const lionY = useTransform(sy, [-1, 1], [-10, 10]);
  const glowX = useTransform(sx, [-1, 1], [30, -30]);
  const glowY = useTransform(sy, [-1, 1], [20, -20]);
  const rotate = useTransform(sx, [-1, 1], [-2, 2]);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative aspect-square w-full overflow-hidden rounded-sm bg-night-2">
      {reduce ? null : <Particles className="absolute inset-0" quantity={40} color="#f1e5d0" size={0.5} staticity={60} ease={40} />}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl"
        style={{ x: glowX, y: glowY }}
      />
      <motion.img
        src="/images/art-lion.webp"
        alt="A golden lion painted in Van Gogh's impasto style beneath a starry sky"
        className="absolute inset-[-6%] h-[112%] w-[112%] object-cover"
        style={{ x: lionX, y: lionY, rotate }}
        loading="lazy"
      />
    </div>
  );
}
