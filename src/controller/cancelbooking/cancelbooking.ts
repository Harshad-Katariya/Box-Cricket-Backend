import { Request, Response } from "express";
import { CookieParser } from "../../comman/cookies";
import jwt from 'jsonwebtoken'
import { CancelbookingModel } from "../../model/boxModel/boxCricketModel";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import Razorpay from "razorpay";
const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY as string,
    key_secret: process.env.RAZOR_PAY_SEC as  string
});
class Cancel_Booking {

    public async cancelbooking (req:Request,res:Response): Promise<any>{

        /* User Coookie And Token Verify */
        let cookie_decode:any = CookieParser.UserCookie(req);
        let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

        /* Cancel Booking Payload And Model */
        const cancelbooking:CancelbookingModel = {
            box_id:parseInt(req.body.box_id) ? req.body.box_id : null,
            slot_id:parseInt(req.body.slot_id) ? req.body.slot_id : null,
            user_id:parseInt(token_decode)
        }
     
        let result = await DBservice.cancelbookingDBservice.cancelbooking(cancelbooking)

        if(!result){
           return response.setResponse(400,{errorMessage:'Somthing Went Wrong'},req,res)
        }
        else{
            response.setResponse(200,{SuccessMessage:'Success',data:cancelbooking},res,req)
        }
    }
}

export const cancelbooking = new Cancel_Booking()