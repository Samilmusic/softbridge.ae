import * as React from "react";
import { BookingDialog } from "@/components/site/BookingDialog";

type Ctx = { openBooking: () => void; closeBooking: () => void };

const BookingContext = React.createContext<Ctx>({ openBooking: () => {}, closeBooking: () => {} });

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const value = React.useMemo<Ctx>(
    () => ({ openBooking: () => setOpen(true), closeBooking: () => setOpen(false) }),
    []
  );
  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog open={open} onOpenChange={setOpen} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return React.useContext(BookingContext);
}
