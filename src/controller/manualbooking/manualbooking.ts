import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { DBservice } from "../../dbservice/dbservice";
import { CookieParser } from "../../comman/cookies";
import { BookingBoxModel } from '../../model/boxModel/boxCricketModel'
import { writeConnection } from "../../config/writeDbConnection";
import { MailServiceBooking } from "../../helper/mail/bookingMail";
import { BookingNumGenrate } from '../../helper/custom';
import moment from "moment";
import { response } from "../../helper/response";
class Manual_Booking {

    public async manualbooking (req:Request,res:Response): Promise<any>{

     /* User Coookie And Token Verify */
      let cookie_decode:any = CookieParser.UserCookie(req);
      let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

      const { start_time, end_time, booking_date,hours} = req.body;
      const TimeConvert = {
            booking_date: moment(booking_date, "DD-MM-YYYY").format('YYYY-MM-DD'),
            start_time: moment(start_time, "hh:mm A").format('HH:mm'),
            end_time: moment(end_time, "hh:mm A").format('HH:mm')
      }

        /* Booking Box Model */
        const bookingBox: BookingBoxModel = {
          booking_num: BookingNumGenrate(4),
          booking_date: TimeConvert.booking_date,
          start_time: TimeConvert.start_time,
          end_time: TimeConvert.end_time,
          mobile_num:req.body.mobile_num,
          // booking_type:req.body.booking_type,
          user_id:req.body.user_id,
          slot_id:parseInt(req.body.slot_id),
          box_id:parseInt(req.body.box_id)
        } 
       
        let result = await DBservice.bookDbservice.bookingbox(bookingBox)

        if(!result){
            response.setResponse(400,{errorMessage:'Somthing went wrong'},res,req)
        }
        else{
          response.setResponse(200,{SuccessMessage:'Success',data:bookingBox},res,req)
        }
    }
}

export const manual_booking = new Manual_Booking()