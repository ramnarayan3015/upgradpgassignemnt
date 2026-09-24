import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ReserveDrawer } from "./ReserveDrawer";

interface ReserveContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ReserveContext = createContext<ReserveContextValue | null>(null);

export function ReserveProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);
  return (
    <ReserveContext.Provider value={value}>
      {children}
      <ReserveDrawer open={isOpen} onClose={close} />
    </ReserveContext.Provider>
  );
}

export function useReserve(): ReserveContextValue {
  const context = useContext(ReserveContext);
  if (!context) throw new Error("useReserve must be used inside ReserveProvider");
  return context;
}
