import { SearchResultT } from "@/@types/types";
import { StyledFlexColumnBox, StyledFlexRowBox } from "@/styles/GlobalStyles";
import { StateContext } from "@/util/StateContext";
import { useState, useContext } from "react";

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { setCoords, setIsOtherComponentOn } = useContext(StateContext);

  const places = new kakao.maps.services.Places();

  const callback = function (result: any, status: any) {
    if (status === kakao.maps.services.Status.OK) {
      setSearchResult(result);
    }
  };

  function handleSearchInput(event: any) {
    setSearchKeyword(event.target.value);
  }

  function handleSearchForm(event: any) {
    event.preventDefault();
    places.keywordSearch(searchKeyword, callback);
  }

  function handleResultClick(result: SearchResultT) {
    setCoords({ lat: result.y, lng: result.x });
    setIsOtherComponentOn(true);
  }

  return (
    <>
      <form onSubmit={handleSearchForm}>
        <input onChange={handleSearchInput} value={searchKeyword}></input>
        <button>dd</button>
      </form>
      {searchResult.length !== 0 &&
        searchResult.map((result: SearchResultT) => (
          <StyledFlexColumnBox
            key={result.id}
            //issue 이 부분에서 좌표 말고 카페 이름 같은 정보도 넘기고 싶은데,,
            onClick={() => handleResultClick(result)}
          >
            <StyledFlexRowBox>
              <span>{result?.place_name}</span>
              <span>{result.category_group_name}</span>
            </StyledFlexRowBox>
          </StyledFlexColumnBox>
        ))}
    </>
  );
}
