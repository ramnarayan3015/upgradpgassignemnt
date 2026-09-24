/** Kinetic text band. Duplicated once so the loop is seamless. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-sm uppercase tracking-[0.28em] text-sand/80">
        {row.map((item, index) => (
          <span key={index} className="flex items-center gap-12">
            {item}
            <span className="h-px w-10 bg-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
