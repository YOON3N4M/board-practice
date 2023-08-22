import { MapDataT, PositionT } from "@/@types/types";
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
  selectedPosition: PositionT | undefined;
  setSelectedPosition: any;
  isOtherComponentOn: any;
  setIsOtherComponentOn: any;
  selectedPlace: any;
  setSelectedPlace: any;
  centerCoords: any;
  setCenterCoords: any;
}

const defaultState = {
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
  selectedPosition: undefined,
  setSelectedPosition: undefined,
  isOtherComponentOn: undefined,
  setIsOtherComponentOn: undefined,
  selectedPlace: undefined,
  setSelectedPlace: undefined,
  centerCoords: undefined,
  setCenterCoords: undefined,
};

export const StateContext = createContext<StateContextT>(defaultState);
