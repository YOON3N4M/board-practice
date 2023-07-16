import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, account, password, sex } = req.body;

  if (req.method === "POST") {
    try {
      const user = await prisma.user.create({
        data: {
          id,
          name,
          account,
          password,
          sex: sex,
        },
      });
      res.status(200).json({ message: "200, 등록 성공" });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
    }
  } else if (req.method === "GET") {
    try {
      const allUsers = await prisma.user.findMany();
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(500).json({ message: "500, 가져오기 실패" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deleteTarget = await prisma.user.delete({
        where: {
          id: req.body,
        },
      });
      res.status(200).json({ message: "200, 삭제 성공" });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
    }
  } else if (req.method === "PUT") {
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        //해당부분도 수정 해야함
        name: "Franz",
      },
    });
  } else {
    res.status(405).json({ message: "405, 메소드가 없어" });
  }
}
