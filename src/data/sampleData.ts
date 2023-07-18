export interface PositionT {
  id: number;
  title: string;
  position: { lat: number; lng: number };
}

export interface ThemeT {
  themeTitle: string;
  marker: MarkerT;
  positions: PositionT[];
}

export interface MarkerT {
  src: string;
  size: { width: number; height: number };
}

//////////////////////////////////////////////

export const defaultMapOption = {
  center: { lat: 35.98818056, lng: 127.9281444 },
  level: 12,
};

export const markerObj = {
  baseballRed: {
    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
    size: { width: 64, height: 69 },
  },
  yellowStar: {
    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
    size: { width: 24, height: 35 },
  },
};

export const groupArr: ThemeT[] = [
  {
    themeTitle: "카페 투어",
    //노란별
    marker: markerObj.baseballRed,
    positions: [
      {
        id: 1,
        title: "카페a",
        position: { lat: 33.450705, lng: 126.570677 },
      },
      {
        id: 2,
        title: "카페b",
        position: { lat: 33.450936, lng: 126.569477 },
      },
      {
        id: 3,
        title: "카페c",
        position: { lat: 33.450879, lng: 126.56994 },
      },
      {
        id: 4,
        title: "카페d",
        position: { lat: 33.451393, lng: 126.570738 },
      },
    ],
  },
  {
    themeTitle: "식당",
    //야구공
    marker: markerObj.yellowStar,
    positions: [
      {
        id: 1,
        title: "식당a",
        position: { lat: 33.550705, lng: 126.570677 },
      },
      {
        id: 2,
        title: "식당b",
        position: { lat: 33.550936, lng: 126.569477 },
      },
      {
        id: 3,
        title: "식당c",
        position: { lat: 33.550879, lng: 126.56994 },
      },
      {
        id: 4,
        title: "식당d",
        position: { lat: 33.551393, lng: 126.570738 },
      },
    ],
  },
];
