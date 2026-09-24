import { TonightPill } from "./TonightPill";
import { ReserveButton } from "./reserve/ReserveButton";

/** Sticky bottom bar on phones: tonight's status and the reservation entry point. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-night/90 px-4 py-3 backdrop-blur-md md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <TonightPill />
      <ReserveButton variant="compact">Reserve</ReserveButton>
    </div>
  );
}
