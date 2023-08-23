import { useState, useContext } from "react";
import styled from "@emotion/styled";
import { PaddingBox } from "../PanelContents";
import { StateContext } from "@/util/StateContext";
import { sampleMember } from "../AddFavModal";

const UserProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5555cc;
`;

export default function Member() {
  const { mapDataFromDB } = useContext(StateContext);
  //const { member } = mapDataFromDB[0];

  const test = "깃충돌 테스트";
  return (
    <>
      {sampleMember.length !== 0 &&
        sampleMember.map((nameTemp: string) => (
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
