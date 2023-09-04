import { ThemeT } from "@/@types/types";
import { StateContext } from "@/util/StateContext";
import { useState, useContext } from "react";
import { PaddingBox } from "../PanelContents";
import { Input, Button, HStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import axios from "axios";
import { API_URL_THEME } from "@/pages/_app";

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
  const [groupTheme, setGroupTheme] = useState<any>([]);
  function handleInputChange(event: any) {
    setNewThemeName(event.target.value);
  }

  const STAR_MARKER =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  const MARKER_SIZE_REGULAR = { width: 24, height: 35 };
  async function addNewTheme(event: any) {
    event.preventDefault();
    const themeTemp = {
      themeTitle: newThemeName,
      marker: STAR_MARKER,
      groupId: mapDataFromDB.id,
    };

    await axios
      .post(API_URL_THEME, themeTemp)
      .then((res: any) => {
        console.log("테마 생성 완료");
        setGroupTheme((prev): any => [...prev, themeTemp]);
      })
      .catch((err: any) => console.log(err));
  }

  console.log(mapDataFromDB.id);
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
      {groupTheme.length !== 0
        ? groupTheme.map((theme: any) => (
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
        : null}
    </>
  );
}
