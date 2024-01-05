import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log(req.query.keyword);
    const url = "https://openapi.naver.com/v1/search/local";
    const params = {
      query: req.query.keyword,
      display: 100,
      start: 1,
      sort: "random",
      total: 10,
    };

    const headers = {
      "X-Naver-Client-Id": process.env.NAVER_SEARCH_API_ID,
      "X-Naver-Client-Secret": process.env.NAVER_SEARCH_API_SECRET,
    };

    // const res = await axios.get(url, { params, headers });

    const result = axios
      .get(url, { params, headers })
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch(error => {
        console.log("error", error.response.data);
      });
  } else {
    res.status(405).json({ message: "405, 메소드가 없어" });
  }
}
