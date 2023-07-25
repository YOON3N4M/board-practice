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
  testPositionArr?: any;
  setTestPositionArr?: any;
  selectedModal: any;
  setSelectedModal: any;
}

const DefalutState = {
  setIsModalOn: undefined,
  selectedAddress: undefined,
  setSelectedAddress: undefined,
  mapDataFromDB: undefined,
  setMapDataFromDB: undefined,
  coords: undefined,
  setCoords: undefined,
  testPositionArr: undefined,
  setTestPositionArr: undefined,
  selectedModal: undefined,
  setSelectedModal: undefined,
};

export const StateContext = createContext<StateContextT>(DefalutState);
