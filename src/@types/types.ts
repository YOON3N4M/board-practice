export interface User {
  id?: string;
  username: string;
  nickname: string;
  account: string;
  password: string;
  //sex: number;
}
//지도 관련
export interface MapDataT {
  id: number;
  member: string[];
  theme: ThemeT[];
}
export interface ThemeT {
  themeTitle: string;
  marker: MarkerT;
  positions?: PositionT[];
  member?: string[];
}
export interface MarkerT {
  src: string;
  size: { width: number; height: number };
}
export interface PositionT {
  id: number;
  title: string;
  coords: coordsT;
  addedBy?: string;
  //sampData수정하고 옵셔널 제거
  member?: string[];
  address?: string;
  positionMemo?: string;
}
export interface coordsT {
  lat: number;
  lng: number;
}
// api result
export interface SearchResultT {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}
