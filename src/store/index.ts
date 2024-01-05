import { Coord } from "@/types/map";
import { create } from "zustand";

interface MapStore {
  selectedCoord: Coord | null;
  setSelectedCoord: (coord: Coord) => void;
}

const useMapStore = create<MapStore>(set => ({
  selectedCoord: null,
  setSelectedCoord: coord => set({ selectedCoord: coord }),
}));

export default useMapStore;
