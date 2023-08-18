import styled from "@emotion/styled";
import Search from "./panelcontents/Search";
import Member from "./panelcontents/Member";
import Setting from "./panelcontents/Setting";
import Theme from "./panelcontents/Theme";

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

export const PaddingBox = styled.div`
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

interface PanelContentsPropsT {
  selectedContents: string;
}

export default function PanelContents({
  selectedContents,
}: PanelContentsPropsT) {
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
