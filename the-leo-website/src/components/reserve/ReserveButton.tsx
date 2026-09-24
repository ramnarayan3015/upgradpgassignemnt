import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useReserve } from "./ReserveProvider";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-display text-[13px] font-medium uppercase tracking-[0.16em] transition-[background-color,color,border-color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-2 active:scale-[0.98]";
const variants = {
  solid: "bg-gold px-6 py-3 text-night hover:bg-gold-2",
  outline: "border border-cream/40 px-6 py-3 text-cream hover:border-cream hover:bg-cream/10",
  compact: "bg-gold px-5 py-2.5 text-night hover:bg-gold-2",
};

export function ReserveButton({
  variant = "solid",
  className = "",
  children = "Reserve a table",
  ...rest
}: { variant?: keyof typeof variants; className?: string; children?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open } = useReserve();
  return (
    <button type="button" onClick={open} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
