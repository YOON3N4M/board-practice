import { Input } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function SearchAddress() {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // places.keywordSearch(keyword, (result, status) => {
    //   if (status === kakao.maps.services.Status.OK) {
    //   }
    // });
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  useEffect(() => {}, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          w={"200px"}
          bgColor={"white"}
          placeholder="검색"
          value={keyword}
        ></Input>
      </form>
    </>
  );
}
