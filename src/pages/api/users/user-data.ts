import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, name, account, password, sex } = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          id,
          name,
          account,
          password,
          sex: sex
        },
      });

      res.status(200).json({ message: "200, 등록 성공" });
    } catch (err) {
      res.status(500).json({ message: "500, 등록 실패" });
    }
  } else if (req.method === "GET"){
    const allUsers = await prisma.user.findMany();

    
  } 
  
  else {
    res.status(405).json({ message: "405, 메소드가 없어" });
  }


}
