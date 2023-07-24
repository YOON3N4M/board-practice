export interface User {
  id: string;
  name: string;
  account: string;
  password: string;
  sex: number;
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
  position: { lat: number; lng: number };
  addedBy?: string;
  //sampData수정하고 옵셔널 제거
  member?: string[];
  address?: string;
}
export interface coordsT {
  lat: number;
  lng: number;
}
