import type { NextApiRequest, NextApiResponse } from "next";

interface User {
  id?: number;
  name: string;
  account: string;
  password: string;
  sex: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { id } = req.query;
  console.log(id);
  res.status(200).json({
    id: 1,
    name: "세남",
    account: "yoon3nam",
    password: "1234a",
    sex: 0,
  });
}
