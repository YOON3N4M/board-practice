import { PlaceResult } from "@/types/map";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface Props {
  setSearchResult: Dispatch<SetStateAction<PlaceResult | undefined>>;
}

export default function LocalSearch(props: Props) {
  const { setSearchResult } = props;

  const places = new kakao.maps.services.Places();
  const [keyword, setKeyword] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    places.keywordSearch(keyword, (result: any, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(result);
      }
    });
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
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
