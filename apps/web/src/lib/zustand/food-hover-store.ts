import { create } from "zustand";

interface FoodHoverStore {
  hoveredFoodId: string | null;
  setHoveredFoodId: (hoveredFoodId: string | null) => void;
}

export const useFoodHoverStore = create<FoodHoverStore>((set) => ({
  hoveredFoodId: null,
  setHoveredFoodId: (hoveredFoodId) => set({ hoveredFoodId }),
}));
