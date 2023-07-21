import { themeArr, member, ThemeT } from "@/data/sampleData";
import { API_URL_MAP } from "@/pages/map";
import { StateContext } from "@/util/StateContext";
import axios from "axios";
import { useState, useContext } from "react";
import { styled } from "styled-components";

const PanelWarp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .panel-title {
    h2 {
      text-align: center;
      border-bottom: 1px solid #696262c3;
      margin: 0;
      padding: 20px 0;
    }
  }
`;

const PaddingBox = styled.div`
  display: flex;
  //background-color: #6962627a;
  padding: 5px 10px;
  border-bottom: 1px solid #6962627a;
  .user-profile-image-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  .member-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0;

    .user-name {
      font-size: 20px;
    }
    .user-added {
      font-size: 14px;
    }
  }
`;

const UserProfileImage = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #5555cc;
`;

const BookmarkImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee01a;
`;

const BookmarkBox = styled.div`
  .bookmark-list {
    display: flex;
    flex-direction: column;
  }
`;

interface PanelContentsPropsT {
  selectedContents: string;
}

export default function PanelContents({
  selectedContents,
}: PanelContentsPropsT) {
  // context 데이터
  const contextData = useContext(StateContext);
  console.log(contextData);

  //멤버
  function Member() {
    return (
      <>
        {member.map(nameTemp => (
          <PaddingBox key={nameTemp}>
            <div className="user-profile-image-box">
              <UserProfileImage />
            </div>
            <div className="member-right">
              <div>
                <span className="user-name">{nameTemp}</span>
                {nameTemp === "세남" && <span>👑</span>}
              </div>
              <div>
                <span className="user-added">등록한 장소 : 1</span>
              </div>
            </div>
          </PaddingBox>
        ))}
      </>
    );
  }
  //검색
  function Search() {
    return (
      <>
        <input></input>
      </>
    );
  }
  //즐겨찾기
  function Theme() {
    const [isOnAdd, setIsOnAdd] = useState(false);
    const [newThemeName, setNewThemeName] = useState("");
    const themeArray = themeArr;

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
        ...contextData.mapDataFromDB[0],
        //id 실제 db로 바꾸면 필요함 id 값
        theme: [...contextData.mapDataFromDB[0].theme, themeTemp],
      };

      await axios
        .put(`http://localhost:4000/map/1`, updatedMapData)
        .then(res => contextData.setMapDataFromDB(updatedMapData))
        .catch(err => console.log(err));
    }
    return (
      <>
        <PaddingBox>
          {isOnAdd ? (
            <form onSubmit={addNewTheme}>
              <input onChange={handleInputChange} value={newThemeName} />
              <button type="submit">추가</button>
            </form>
          ) : (
            <button onClick={() => setIsOnAdd(true)}>새 테마 추가하기 +</button>
          )}
        </PaddingBox>
        {contextData?.mapDataFromDB[0]?.theme?.length !== 0 ? (
          contextData?.mapDataFromDB[0]?.theme?.map((theme: any) => (
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

  //설정
  function Setting() {
    return (
      <>
        <button>이 그룹에서 나가기</button>
      </>
    );
  }
  //최종 렌더링
  return (
    <PanelWarp>
      <div className="panel-title">
        <h2>{selectedContents}</h2>
      </div>
      {
        {
          멤버: <Member />,
          검색: <Search />,
          테마: <Theme />,
          설정: <Setting />,
        }[selectedContents]
      }
    </PanelWarp>
  );
}
