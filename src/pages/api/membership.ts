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
    const anyUserId: any = userId;
    const anyGroupId: any = Number(groupId);
    console.log(anyGroupId, anyUserId);
    const toNumberParams = {
      numberGroupId: Number(groupId),
      numberRequestType: Number(requestType),
    };
    //1이면 로그인한 계정기준 계정이 속한 그룹을 모두 가져옴
    if (toNumberParams.numberRequestType === 1) {
      try {
        const getMembershipArr = await prisma.membership.findMany({
          where: {
            userId: anyUserId,
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
    } else if (toNumberParams.numberRequestType === 2) {
      //2면 로그인한 계정기준 계정이 속한 그룹을 모두 가져옴
      try {
        const getMembershipArr = await prisma.membership.findMany({
          where: {
            groupId: toNumberParams.numberGroupId,
          },
          include: {
            user: true,
            group: true,
          },
        });
        const users = getMembershipArr.map(
          (membership): any => membership.user
        );
        const group = getMembershipArr.map(membership => membership.group);
        res.status(200).json({ userArr: users, group: group[0] });
      } catch (err) {
        res.status(500).json({ message: "500, 등록 실패" });
      }
    } else if (toNumberParams.numberRequestType === 3) {
      try {
        const getMembership = await prisma.membership.findMany({
          where: {
            userId: anyUserId,
            groupId: anyGroupId,
          },
        });

        console.log(getMembership);
        res.status(200).json({ res: getMembership });
      } catch {
        res.status(500).json({ message: "500, 등록 실패" });
      }
    }
  }
}
