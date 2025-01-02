import { create } from "zustand";
import { DateTime } from "luxon";

interface DateTimeStore {
  currentDateTime: string;
  setCurrentDateTime: (currentDateTime: string) => void;
  setNow: () => void;
}

export const useDateTimeStore = create<DateTimeStore>((set) => ({
  currentDateTime: DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
  setCurrentDateTime: (currentDateTime) => {
    set({ currentDateTime });
  },
  setNow: () => {
    const currentDateTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
    set({ currentDateTime });
  },
}));
