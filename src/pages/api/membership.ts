import { MembershipAPIParams } from "@/@types/types";
import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { groupId, userId } = req.body;
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
      //  console.log(err);
    }
  } else if (req.method === "GET") {
    const { groupId, requestType, userId } = req.query;
    const test: any = userId;
    const toNumberParams = {
      numberGroupId: Number(groupId),
      numberRequestType: Number(requestType),
    };
    //1이면 로그인한 계정기준 계정이 속한 그룹을 모두 가져옴
    if (toNumberParams.numberRequestType === 1) {
      try {
        const getMembershipArr = await prisma.membership.findMany({
          where: {
            userId: test,
          },
          include: {
            group: true,
          },
        });
        const groups = getMembershipArr.map(membership => membership.group);
        res.status(200).json({ groupArr: groups });
      } catch (err) {
        res.status(500).json({ message: "500, 등록 실패", err: err });
      }
    } else {
      //2면 로그인한 계정기준 계정이 속한 그룹을 모두 가져옴
      try {
        const getMembershipArr = await prisma.membership.findMany({
          where: {
            groupId: toNumberParams.numberGroupId,
          },
          include: {
            user: true,
          },
        });
        const users = getMembershipArr.map(membership => membership.user);
        res.status(200).json({ userArr: users });
      } catch (err) {
        res.status(500).json({ message: "500, 등록 실패" });
      }
    }
  }
}
