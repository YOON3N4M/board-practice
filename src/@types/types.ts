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

// 실제 적용할 타입

export interface GroupT {
  id: number;
  name: string;
  map_info?: string;
  group_cover: string;
  group_leader: string;
}
export interface MembershipAPIParams {
  groupId?: number;
  userId?: string;
  /**1은 로그인 유저가 속한 그룹 (userId) , 2는 그룹에 속한 유저 (groupId) 3은 해당 유저가 그룹에 가입 되어 있는지 */
  requestType?: 1 | 2 | 3;
}

export interface UserT {
  email: string;
  emailVerified?: any;
  id?: string;
  image: string;
  name?: string;
  nickname?: string;
  profileColor?: string;
}
