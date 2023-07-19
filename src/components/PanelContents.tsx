import { member } from "@/data/sampleData";
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

  //최종출력
  return (
    <PanelWarp>
      <div className="panel-title">
        <h2>멤버</h2>
      </div>
      {
        {
          멤버: <Member />,
          검색: <Search />,
        }[selectedContents]
      }
    </PanelWarp>
  );
}
