import { create } from "zustand";
import { DateTime } from "luxon";

interface DateTimeStore {
  currentDateTime: string;
  setCurrentDateTime: (currentDateTime: string) => void;
}

export const useDateTimeStore = create<DateTimeStore>((set) => {
  return {
    currentDateTime: DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"),
    setCurrentDateTime: (currentDateTime) => {
      set({ currentDateTime });
    },
  };
});
