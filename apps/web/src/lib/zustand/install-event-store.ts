import { create } from "zustand";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: "accepted" | "dismissed" }>;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  readonly platforms: Array<string>;
}

interface InstallPromptStore {
  event: BeforeInstallPromptEvent | null;
  setEvent: (event: BeforeInstallPromptEvent | null) => void;
}

export const useInstallPromptStore = create<InstallPromptStore>((set) => ({
  event: null,
  setEvent: (event) => set({ event }),
}));
