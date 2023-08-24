import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { groupId, userId } = req.body;
  if (req.method === "POST") {
    try {
      const membership = await prisma.membership.create({
        data: {
          groupId: groupId,
          userId: userId,
        },
      });
      res.status(200).json({ message: "200, 등록 성공" });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
      console.log(err);
    }
  }
  if (req.method === "GET") {
    try {
      const getMembershipArr = await prisma.membership.findMany({
        where: {
          userId: userId,
        },
        include: {
          group: true,
        },
      });
      const groups = getMembershipArr.map(membership => membership.group);
      res.status(200).json({ groupArr: groups });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
    }
  }
}
