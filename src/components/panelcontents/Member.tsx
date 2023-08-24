import { useState, useContext } from "react";
import styled from "@emotion/styled";
import { PaddingBox } from "../PanelContents";
import { StateContext } from "@/util/StateContext";
import { sampleMember } from "../AddFavModal";
import { Text } from "@chakra-ui/react";

const UserProfileImage = styled.div`
  width: 40px;
  height: 40px;
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
                <Text fontSize={"15px"}>{nameTemp}</Text>
                {nameTemp === "세남" && <span>👑</span>}
              </div>
              <div>
                <Text fontSize={"11px"}>등록한 장소 : 1</Text>
              </div>
            </div>
          </PaddingBox>
        ))}
    </>
  );
}
