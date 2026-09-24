import { useEffect, useState } from "react";
import { tonightStatus, type TonightStatus } from "../lib/tonight";

/** Live "tonight" status, recomputed every minute in Toronto time. */
export function TonightPill({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<TonightStatus>(() => tonightStatus());
  useEffect(() => {
    const id = window.setInterval(() => setStatus(tonightStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  const dot = status.state === "open" ? "bg-gold-2" : status.state === "later" ? "bg-sand/70" : "bg-muted";
  return (
    <span className={`inline-flex items-center gap-2 text-xs text-sand/80 ${className}`} title={status.detail}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
      <span className="font-display uppercase tracking-[0.18em]">{status.label}</span>
      <span className="hidden text-sand/60 lg:inline">{status.detail}</span>
    </span>
  );
}
