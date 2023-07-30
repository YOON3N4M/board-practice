//defaul setting
import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { 
        user_id, 
        group_id,
        group_theme_name,
        group_name,
    } = req.body;

    if (req.method === "POST") {
        try {
            const User_group = prisma.user_group.create({
            data: {
                user_id : user_id, 
                group_id : group_id,
                group_theme_name : group_theme_name,
                group_name : group_name
            },
          })
          
          res.status(200).json({ message: "200, 등록 성공" });
        } catch (err) {
          res.status(500).json({ message: "500, 등록 실패" });
        }

      }
  }
//defaul setting end