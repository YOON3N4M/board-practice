import { ThemeT } from "@/@types/types";
import { StateContext } from "@/util/StateContext";
import { useState, useContext } from "react";
import { PaddingBox } from "../PanelContents";
import { Input, Button, HStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import axios from "axios";

const BookmarkImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee01a;
`;

export default function Theme() {
  const [isOnAdd, setIsOnAdd] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");

  const { mapDataFromDB, setMapDataFromDB } = useContext(StateContext);

  function handleInputChange(event: any) {
    setNewThemeName(event.target.value);
  }

  async function addNewTheme(event: any) {
    event.preventDefault();
    const themeTemp: ThemeT = {
      themeTitle: newThemeName,
      marker: {
        //마커 이미지 db에 올리고 해당 부분 선택할 수 있게 수정 해야함.
        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        size: { width: 24, height: 35 },
      },
      positions: [],
    };

    const updatedMapData = {
      ...mapDataFromDB[0],
      //id 실제 db로 바꾸면 필요함 id 값
      theme: [...mapDataFromDB[0].theme, themeTemp],
    };

    await axios
      .put(`http://localhost:4000/map/1`, updatedMapData)
      .then((res: any) => setMapDataFromDB(updatedMapData))
      .catch((err: any) => console.log(err));
  }
  return (
    <>
      <PaddingBox>
        {isOnAdd ? (
          <form onSubmit={addNewTheme}>
            <HStack>
              <Input
                display={"inline"}
                onChange={handleInputChange}
                value={newThemeName}
              />
              <Button
                type="submit"
                backgroundColor={"blue.800"}
                color={"white"}
              >
                추가
              </Button>
            </HStack>
          </form>
        ) : (
          <button onClick={() => setIsOnAdd(true)}>새 테마 추가하기 +</button>
        )}
      </PaddingBox>
      {mapDataFromDB[0]?.theme?.length !== 0 ? (
        mapDataFromDB[0]?.theme?.map((theme: any) => (
          <PaddingBox key={theme.themeTitle}>
            <div className="user-profile-image-box">
              <BookmarkImage />
            </div>
            <div className="member-right">
              <div>
                <span className="user-name">{theme.themeTitle}</span>
              </div>
              <div>
                <span className="user-added">
                  장소 : {theme?.positions?.length} 개
                </span>
              </div>
            </div>
          </PaddingBox>
        ))
      ) : (
        <h1>없어</h1>
      )}
    </>
  );
}
