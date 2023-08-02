//defaul setting
import prisma from "@/util/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { 
        main_board_id, 
        user_id, 
        user_account,
        user_name, 
        main_board_title,
        place_name,
        main_board_memo,
        main_board_img,
        group_id,
        group_theme_name,
        location_address,
        main_board_lng,
        main_board_lat,
    } = req.body;

    if (req.method === "POST") {
        try {
          const main_board = await prisma.main_board.create({
            data: {
                main_board_id : main_board_id, 
                user_id : user_id, 
                user_account :user_account,
                user_name : user_name, 
                main_board_title : main_board_title,
                place_name : place_name,
                main_board_memo : main_board_memo,
                main_board_img : main_board_img,
                group_id : group_id,
                group_theme_name : group_theme_name,
                location_address : location_address,
                main_board_lng : main_board_lng,
                main_board_lat : main_board_lat,
            },
          })
          res.status(200).json({ message: "200, 등록 성공" });
        } catch (err) {
          res.status(500).json({ message: "500, 등록 실패" });
        }

      }
  }
//defaul setting end