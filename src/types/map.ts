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
