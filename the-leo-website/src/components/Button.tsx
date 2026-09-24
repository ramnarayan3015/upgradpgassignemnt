import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "solid" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[13px] font-medium uppercase tracking-[0.16em] transition-[background-color,color,border-color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-2 active:scale-[0.98] cursor-pointer";
const variants: Record<Variant, string> = {
  solid: "bg-gold text-night hover:bg-gold-2",
  outline: "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
  ghost: "text-cream/80 hover:text-cream underline-offset-4 hover:underline px-2",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  to,
  variant = "solid",
  className = "",
  children,
  ...rest
}: CommonProps & { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to.startsWith("http") || to.startsWith("mailto:") || to.startsWith("tel:")) {
    return (
      <a href={to} className={cls} target={to.startsWith("http") ? "_blank" : undefined} rel={to.startsWith("http") ? "noreferrer" : undefined} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className = "",
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
