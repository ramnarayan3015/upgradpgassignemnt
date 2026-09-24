import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Minus, Phone, Plus, X } from "lucide-react";
import { SITE } from "../../data/site";
import { prettyTime, serviceTimes, tonightStatus } from "../../lib/tonight";

function todayISO(): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y!, m! - 1, d! + days));
  return date.toISOString().slice(0, 10);
}

function labelFor(iso: string, index: number): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y!, m! - 1, d!)));
}

export function ReserveDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState<string | null>(null);
  const firstFocus = useRef<HTMLButtonElement>(null);
  const status = useMemo(() => tonightStatus(), []);
  const days = useMemo(() => {
    const start = todayISO();
    return Array.from({ length: 14 }, (_, index) => addDays(start, index));
  }, []);
  const times = useMemo(() => serviceTimes(date), [date]);

  useEffect(() => {
    if (open) {
      setTime(null);
      window.setTimeout(() => firstFocus.current?.focus(), 50);
    }
  }, [open]);

  const yelpUrl = useMemo(() => {
    const url = new URL(SITE.reserveUrl);
    url.searchParams.set("covers", String(guests));
    url.searchParams.set("date", date);
    if (time) url.searchParams.set("time", time.replace(":", ""));
    return url.toString();
  }, [guests, date, time]);

  const summary = `${guests} ${guests === 1 ? "guest" : "guests"}, ${labelFor(date, days.indexOf(date))}${time ? ` at ${prettyTime(time)}` : ""}`;

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close reservation panel"
            className="fixed inset-0 z-[80] cursor-pointer bg-night/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="reserve-title"
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col overflow-y-auto border-l border-line bg-night-2 px-6 pb-8 pt-6 shadow-2xl md:px-8"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.24em] text-gold-2">{status.label}</p>
                <h2 id="reserve-title" className="mt-2 font-display text-3xl font-light uppercase tracking-[0.08em]">
                  Reserve a table
                </h2>
                <p className="mt-1 text-sm text-sand/70">{status.detail}</p>
              </div>
              <button
                ref={firstFocus}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-cream/60"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-8">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-sand/70">Guests</p>
                <div className="mt-3 flex items-center gap-4">
                  <button
                    type="button"
                    aria-label="Fewer guests"
                    disabled={guests <= 1}
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-cream/60 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-12 text-center font-display text-3xl font-light tabular-nums" aria-live="polite">
                    {guests}
                  </span>
                  <button
                    type="button"
                    aria-label="More guests"
                    disabled={guests >= 12}
                    onClick={() => setGuests((g) => Math.min(12, g + 1))}
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-cream/60 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={16} />
                  </button>
                  <span className="text-sm text-sand/60">Parties over 12: see private events</span>
                </div>
              </div>

              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-sand/70">Date</p>
                <div className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1">
                  {days.map((iso, index) => {
                    const closed = serviceTimes(iso).length === 0;
                    const selected = iso === date;
                    return (
                      <button
                        key={iso}
                        type="button"
                        disabled={closed}
                        aria-pressed={selected}
                        onClick={() => {
                          setDate(iso);
                          setTime(null);
                        }}
                        className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                          selected ? "border-gold-2 bg-gold-2 text-night" : "border-line text-cream/80 hover:border-cream/60"
                        }`}
                      >
                        {labelFor(iso, index)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="font-display text-xs uppercase tracking-[0.22em] text-sand/70">Time</p>
                {times.length === 0 ? (
                  <p className="mt-3 text-sm text-sand/60">Closed that day. Pick another date.</p>
                ) : (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {times.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        aria-pressed={time === slot}
                        onClick={() => setTime(slot)}
                        className={`cursor-pointer rounded-sm border px-2 py-2.5 text-sm tabular-nums transition-colors ${
                          time === slot ? "border-gold-2 bg-gold-2 text-night" : "border-line text-cream/80 hover:border-cream/60"
                        }`}
                      >
                        {prettyTime(slot)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-10">
              <p className="text-sm text-sand/70">{summary}</p>
              <a
                href={yelpUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-display text-[13px] font-medium uppercase tracking-[0.16em] text-night transition-colors hover:bg-gold-2"
              >
                Continue to book <ArrowUpRight size={16} />
              </a>
              <a
                href={SITE.phoneHref}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/40 px-6 py-3.5 font-display text-[13px] font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
              >
                <Phone size={15} /> Call {SITE.phone}
              </a>
              <p className="mt-4 text-xs text-muted">Booking completes on Yelp Reservations. Your guests, date and time carry over.</p>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
