import { create } from "zustand";

interface MealHoverStore {
  hoveredMealId: string | null;
  setHoveredMealId: (hoveredMealId: string | null) => void;
}

export const useMealHoverStore = create<MealHoverStore>((set) => ({
  hoveredMealId: null,
  setHoveredMealId: (hoveredMealId) => set({ hoveredMealId }),
}));
