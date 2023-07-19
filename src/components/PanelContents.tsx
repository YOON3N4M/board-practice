import { groupArr, member } from "@/data/sampleData";
import { useState } from "react";
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

const MemberBox = styled.div`
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
  //멤버
  function Member() {
    return (
      <>
        {member.map(nameTemp => (
          <MemberBox key={nameTemp}>
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
          </MemberBox>
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
  function Bookmark() {
    const bookmarkArr = groupArr;

    return (
      <>
        {bookmarkArr.map(bookmark => (
          <MemberBox key={bookmark.themeTitle}>
            <div className="user-profile-image-box">
              <BookmarkImage />
            </div>
            <div className="member-right">
              <div>
                <span className="user-name">{bookmark.themeTitle}</span>
              </div>
              <div>
                <span className="user-added">
                  북마크 : {bookmark.positions.length} 개
                </span>
              </div>
            </div>
          </MemberBox>
        ))}
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
          즐겨찾기: <Bookmark />,
          설정: <Setting />,
        }[selectedContents]
      }
    </PanelWarp>
  );
}
