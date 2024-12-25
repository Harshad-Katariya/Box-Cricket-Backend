import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { CookieParser } from "../../comman/cookies";
import { AddSlotModel } from "../../model/boxModel/bookingModel";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import { writeConnection } from "../../config/writeDbConnection";

class AddBoxSlot {

    public async addboxslot(req: Request, res: Response): Promise<any> {

        try {

            /* User Coookie And Token Verify */
            let cookie_decode: any = CookieParser.UserCookie(req);
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

            /* Add Box Cricket Slot Model */
            const addSlot: AddSlotModel = {
                slot_name:req.body.slot_name,
                width: req.body.width,
                heigth: req.body.heigth,
                length: req.body.length,
                price: parseInt(req.body.price),
                user_id: parseInt(token_decode),
                box_id: parseInt(req.body.box_id)
            }

            await writeConnection.startTransaction()

            let result = await DBservice.addslotDBservice.addboxslot(addSlot)

            if (!result) {
                await writeConnection.rollback()
                return response.setResponse(400, { errorMessage: 'Somthing Went Wrong.' }, res, req)
            }
            else {
                await writeConnection.commit()
                response.setResponse(200, { SuccessMessage: 'Success', data: addSlot }, res, req)
            }
        } catch (error) {
            console.log("Add Box Slot Error = = = = = = =>", error);
            await writeConnection.rollback()
            response.setResponse(500, { errorMessage: 'Internal Server Error.' }, res, req)
        }
    }
}
export const Add_Box_Slot = new AddBoxSlot()