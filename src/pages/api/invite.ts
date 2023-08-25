import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { inviteCode, groupId, expired } = req.body;
    try {
      const existCode = await prisma.invite.findUnique({
        where: {
          inviteCode: inviteCode,
        },
      });

      if (existCode) {
        res.status(400).json({ message: "중복 코드 존재" });
        return;
      }

      const inviteCodeRes = await prisma.invite.create({
        data: {
          groupId: groupId,
          inviteCode: inviteCode,
          expired: expired,
        },
      });
      res.status(200).json({ message: "200, 등록 성공", inviteCodeRes });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
    }
  } else if (req.method === "GET") {
    const { inviteId }: any = req.query;

    try {
      const invite = await prisma.invite.findUnique({
        where: {
          inviteCode: inviteId,
        },
        include: {
          group: true,
        },
      });

      res.status(200).json({ message: "200, 등록 성공", group: invite?.group });
    } catch (err) {}
  }
}
