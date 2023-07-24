//////////////////////////////////////////////

import { ThemeT } from "@/@types/types";

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

export const member = [
  "세남",
  "세용",
  "찬영",
  "정빈",
  "정우",
  "지수",
  "형철",
  "형근",
  "현우",
];

export const themeArr: ThemeT[] = [
  {
    themeTitle: "카페 투어",
    //노란별
    marker: markerObj.baseballRed,
    member: member,
    positions: [
      {
        //여기에 addByMember: "수진" 이런식으로 추가 되면 좋을듯
        id: 1,
        title: "카페a",
        coords: { lat: 36.758479818754196, lng: 126.47641895667431 },
      },
      {
        //여기에 addByMember: "수진" 이런식으로 추가 되면 좋을듯
        id: 1,
        title: "카페a",
        coords: { lat: 36.758479818754196, lng: 126.47641895667431 },
      },
      {
        //여기에 addByMember: "수진" 이런식으로 추가 되면 좋을듯
        id: 1,
        title: "카페a",
        coords: { lat: 36.758479818754196, lng: 126.47641895667431 },
      },
      {
        //여기에 addByMember: "수진" 이런식으로 추가 되면 좋을듯
        id: 1,
        title: "카페a",
        coords: { lat: 36.758479818754196, lng: 126.47641895667431 },
      },
      {
        id: 2,
        title: "카페b",
        coords: { lat: 36.477656643858246, lng: 126.64399613494022 },
      },
      {
        id: 3,
        title: "카페c",
        coords: { lat: 37.073313345879626, lng: 127.10183730836599 },
      },
      {
        id: 4,
        title: "카페d",
        coords: { lat: 36.6811069763739, lng: 127.14714365476813 },
      },
    ],
  },
  {
    themeTitle: "식당",
    //야구공
    marker: markerObj.yellowStar,
    member: member,
    positions: [
      {
        id: 1,
        title: "식당a",
        coords: { lat: 37.51313109639122, lng: 128.7065292590807 },
      },
      {
        id: 2,
        title: "식당b",
        coords: { lat: 37.25080886027029, lng: 129.22567672017348 },
      },
      {
        id: 3,
        title: "식당c",
        coords: { lat: 36.939171584572605, lng: 129.36023091108171 },
      },
      {
        id: 4,
        title: "식당d",
        coords: { lat: 37.80648467751425, lng: 128.82952617286054 },
      },
    ],
  },
];
