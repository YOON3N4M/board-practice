export interface Group {
  id?: number;
  leader: string;
  title: string;
  cover: string;
}

export interface Category {
  id?: number;
  title: string;
  groupId: number;
  marker?: string;
}

export interface Favorite {
  category: string;
  title: string;
  address: string;
  coord: { lat: number; lng: number };
  date?: string;
  members: string[];
  photo?: string;
  memo?: string;
}

export interface Coord {
  lat: number;
  lng: number;
}

//API 응답 값
export interface PlaceResult {
  address: {
    address_name: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    zip_code: string;
  };
  road_address: {
    address_name: string;
    building_name: string;
    main_building_no: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    sub_building_no: string;
    underground_yn: string;
    zone_no: string;
  };
}
