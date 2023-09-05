import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  if (req.method === "POST") {
    const { name, groupId, marker } = req.body;
    try {
      const theme = await prisma.theme.create({
        data: {
          name: name,
          groupId,
          marker,
        },
      });
      res.status(200).json({ message: "200, 등록 성공" });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
    }
  } else if (req.method === "GET") {
    const { groupId } = req.query;
    const numGroupId = Number(groupId);
    try {
      const theme = await prisma.theme.findMany({
        where: {
          groupId: numGroupId,
        },
      });
      res.status(200).json({ message: "성공", theme });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
    }
  }
}
