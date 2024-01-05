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
  date?: string;
  members: string[];
  photo?: string;
  memo?: string;
}
