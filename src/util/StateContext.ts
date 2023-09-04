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
  groupMember: any;
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
  groupMember: undefined,
};

const groupState = {
  groupData: undefined,
  setGroupData: undefined,
  inviteURL: undefined,
  setInviteURL: undefined,
};

interface GroupStateT {
  groupData: any;
  setGroupData: any;
  inviteURL: any;
  setInviteURL: any;
}
export const StateContext = createContext<StateContextT>(defaultState);
export const GroupContext = createContext<GroupStateT>(groupState);
