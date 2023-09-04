import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const { themeTitle, groupId, marker } = req.body;

  if (req.method === "POST") {
    try {
      const theme = await prisma.theme.create({
        data: {
          name: themeTitle,
          groupId,
          marker,
        },
      });
      res.status(200).json({ message: "200, 등록 성공" });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
    }
  }
}
