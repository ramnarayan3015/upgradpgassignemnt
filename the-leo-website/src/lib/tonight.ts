/** Opening hours in America/Toronto, keyed by JS weekday (0 = Sunday). */
const HOURS: Record<number, { open: number; close: number } | null> = {
  0: { open: 17, close: 21 },
  1: null,
  2: null,
  3: { open: 17, close: 21 },
  4: { open: 17, close: 21 },
  5: { open: 17, close: 22 },
  6: { open: 17, close: 22 },
};
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export interface TonightStatus {
  state: "open" | "later" | "closed";
  label: string;
  detail: string;
}

export function formatHour(hour: number): string {
  const suffix = hour >= 12 ? "pm" : "am";
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve} ${suffix}`;
}

export function torontoNow(date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return { day: SHORT_DAYS[weekday] ?? 0, minutes: hour * 60 + minute };
}

export function tonightStatus(date = new Date()): TonightStatus {
  const { day, minutes } = torontoNow(date);
  const today = HOURS[day] ?? null;
  if (today && minutes >= today.open * 60 && minutes < today.close * 60) {
    return { state: "open", label: "Open now", detail: `Kitchen open until ${formatHour(today.close)}` };
  }
  if (today && minutes < today.open * 60) {
    return { state: "later", label: "Opens tonight", detail: `Doors at ${formatHour(today.open)} until ${formatHour(today.close)}` };
  }
  for (let offset = 1; offset <= 7; offset += 1) {
    const next = (day + offset) % 7;
    const hours = HOURS[next];
    if (hours) {
      const when = offset === 1 ? "tomorrow" : DAY_NAMES[next]!;
      return { state: "closed", label: "Closed now", detail: `Back ${when} at ${formatHour(hours.open)}` };
    }
  }
  return { state: "closed", label: "Closed", detail: "See hours" };
}

/** Service times offered in the reservation drawer for a given date. */
export function serviceTimes(dateISO: string): string[] {
  const [y, m, d] = dateISO.split("-").map(Number);
  if (!y || !m || !d) return [];
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const hours = HOURS[day];
  if (!hours) return [];
  const slots: string[] = [];
  for (let t = hours.open * 60; t <= hours.close * 60 - 60; t += 30) {
    const h = Math.floor(t / 60);
    const mm = t % 60;
    slots.push(`${h.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`);
  }
  return slots;
}

export function prettyTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = (h ?? 0) >= 12 ? "pm" : "am";
  const twelve = (h ?? 0) % 12 === 0 ? 12 : (h ?? 0) % 12;
  return `${twelve}:${(m ?? 0).toString().padStart(2, "0")} ${suffix}`;
}
