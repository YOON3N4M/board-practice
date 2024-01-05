import { Input } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SearchAddress() {
  const [keyword, setKeyword] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getSearchApi();
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  async function getSearchApi() {
    const url = "/api/naver/search";
    try {
      const res = await axios.get(url, { params: { keyword } });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

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
