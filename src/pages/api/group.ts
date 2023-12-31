import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { group_cover, group_leader, groupName, userId } = req.body;
    try {
      const createGroup = await prisma.group.create({
        data: {
          name: groupName,
          //    map_info: "",
          group_leader: group_leader,
          group_cover: group_cover,
        },
      });
      res.status(200).json({ groupId: createGroup.id });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
      console.log(err);
    }
  }
}
