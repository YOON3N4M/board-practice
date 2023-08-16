import { styled } from "styled-components";
import { AuthForm, AuthFormWrapper, FormBox } from "./register";
import { useState } from "react";

const StyledCreateGroupForm = styled(AuthForm)`
  position: relative;
  padding: 20px;
  h4 {
    margin: 0px;
  }
  span {
    margin-bottom: 15px;
    font-size: 0.9rem;
    color: gray;
  }
  .detail-box {
    position: relative;
    margin-bottom: 10px;
  }

  .detail-span {
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      color: #d3d3d3;
    }
  }

  .detail-contents {
    position: absolute;
    // width: 800px;
    //height: 100px;
    padding: 1rem 1rem;
    background-color: #e9e9e9;
    border-radius: 4px;
    span {
      color: #333333;
    }
  }
`;

export default function CreateGroup() {
  const [isVisibleDetail, setIsVisibleDetail] = useState(false);
  return (
    <>
      <AuthFormWrapper>
        <FormBox>
          <StyledCreateGroupForm>
            <h2>멤버 추가하기</h2>
            <h4>이제 멤버를 초대 해봅시다!</h4>
            <span></span>

            <div className="input-box">
              <label>아이디로 검색하기</label>
              <input name="name" required />
            </div>
            <button type="submit">일단은 넘어가기</button>
            {/* 인덱스2 
            <h2>새로운 테마 만들기</h2>
            <h4>원하는 테마를 만들어보세요!</h4>
            <span>하나의 그룹엔 여러 개의 테마를 만들 수 있습니다.</span>
            <div className="detail-box">
              <span
                className="detail-span"
                onMouseOver={() => setIsVisibleDetail(true)}
                onMouseLeave={() => setIsVisibleDetail(false)}
              >
                자세히...
              </span>
              {isVisibleDetail && (
                <div className="detail-contents">
                  <span>
                    예를 들어 "고등학교 동창"이라는 그룹에 "여행"이라는 테마를
                    만들어 해당 모임에서 함께했던 여행들을 기록 할 수 있습니다.
                    "학창 시절 자주갔던 장소"라는 테마를 새로 만들어 학창 시절
                    추억의 장소들도 기록해볼 수 있죠! 테마는 이후에도 언제든지
                    추가할 수 있습니다.
                  </span>{" "}
                </div>
              )}
            </div>
            <div className="input-box">
              <label>새 그룹 이름</label>
              <input name="name" required />
            </div>
            <button type="submit">다음</button> */}
            {/* 인덱스 1
             <h2>새로운 그룹 만들기</h2>
            <h4>원하는 그룹의 이름을 입력해주세요</h4>
            <span>ex) 카페 투어 모임☕, 땡땡 고등학교 동창 모임</span>
            <div className="input-box">
              <label>새 그룹 이름</label>
              <input name="name" required />
            </div>
            <button type="submit">다음</button> */}
          </StyledCreateGroupForm>
        </FormBox>
      </AuthFormWrapper>
    </>
  );
}
