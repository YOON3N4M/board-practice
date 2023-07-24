import { MapDataT } from "@/@types/types";
import { createContext } from "react";

interface StateContextT {
  setIsModalOn?: any;
  selectedAddress?: any;
  setSelectedAddress?: any;
  mapDataFromDB?: any;
  setMapDataFromDB?: any;
  coords?: any;
  setCoords?: any;
}

const DefalutState = {
  setIsModalOn: undefined,
  selectedAddress: undefined,
  setSelectedAddress: undefined,
  mapDataFromDB: undefined,
  setMapDataFromDB: undefined,
  coords: undefined,
  setCoords: undefined,
};

export const StateContext = createContext<StateContextT>(DefalutState);
