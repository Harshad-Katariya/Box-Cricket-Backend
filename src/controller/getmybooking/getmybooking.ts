import { Request, Response } from "express";
import { CookieParser } from "../../comman/cookies";
import { DBservice } from "../../dbservice/dbservice";
import jwt from "jsonwebtoken";
import { GetMyBooking } from "../../model/boxModel/bookingModel";
import { response } from "../../helper/response";
import moment from "moment";
import { validationResult } from "express-validator"; 

class Get_My_Booking {

    public async getmybooking(req: Request, res: Response): Promise<any> {
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
           return response.setResponse(400, { message: errors.array() }, res, req)
        }
        
        try {
            /* User Coookie And Token Verify */
            let cookie_decode: any = CookieParser.UserCookie(req);
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);
    
            /* Get My Booking Payload And Model */
            const get_my_booking:GetMyBooking = {
                user_id:parseInt(token_decode),
                box_id:parseInt(req.body.box_id)
            }
            let data = req.query
            let resp = []
            let result = await DBservice.bookDbservice.getmybooking(get_my_booking["user_id"],get_my_booking["box_id"],data)
            let i=0;
            while(i < result.length){
                let result_data = result[i]
                resp.push({
                    booking_num: result_data['booking_num'],
                    booking_date: moment(result_data['booking_date'],'YYYY-MM-DD').format('DD-MM-YYYY'),
                    start_time: moment(result_data['start_time'],'HH:mm').format('hh:mm A'),
                    end_time: moment(result_data['end_time'],'HH:mm').format('hh:mm A'),
                    slot_name: result_data['slot_name'],
                    username: result_data['username'],
                    mobile_num: result_data['mobile_num']
                })
                i++;
            }
        
            if(!result){
               return response.setResponse(400,{errorMessage:'Somthing wengt wrong'},res,req)
            }
            else if(data.filter==='upcoming' && result.length===0){
                return response.setResponse(200,{errorMessage:'There are no upcoming bookings available in your schedule.'},res,req)
            }
            else if(data.filter==='yesterday' && result.length===0){
                return response.setResponse(200,{errorsMessage:'There are no bookings from yesterday in the system'},res,req)
            }
            else if(data.filter==='tomorrow' && result.length===0){
                return response.setResponse(200,{errorMessage:'No bookings are scheduled for tomorrow.'},res,req)
            }
            else if(data.filter==='today' && result.length===0){
                return response.setResponse(200,{errorMessage:"No bookings have been recorded for today's date."},res,req)
            }
            else{
                response.setResponse(200,{SuccessMessage:'Success',data:resp},res,req)
            }

            
        } catch (error) {
            console.log("Get My Booking Error = = = =>",error);
           return response.setResponse(500,{errorMessage:'Internal Server Error'},res,req)
        }
       
    }
}

export const Get_Booking = new Get_My_Booking()