import { Request, Response } from "express";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import moment from 'moment';
import jwt from "jsonwebtoken";
import { BookingBoxModel } from '../../model/boxModel/boxCricketModel'
import { writeConnection } from "../../config/writeDbConnection";
import { CookieParser } from "../../comman/cookies";
import { MailServiceBooking } from "../../helper/mail/bookingMail";
import { BookingNumGenerate } from '../../helper/custom'

class BookingBoxCricket{

    public async bookingBox(req: Request, res: Response): Promise<any> {
        try {
    
          /* User Coookie And Token Verify */
          let cookie_decode:any = CookieParser.UserCookie(req);
          let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);
                    
          console.log("Token Decode =  =  =  = = >",token_decode);
        
          /* Convert Date And Time  */
          const { start_time, end_time, booking_date,hours} = req.body;
          const TimeConvert = {
            booking_date: moment(booking_date).format('YYYY-MM-DD'),
            start_time: moment(start_time, "hh:mm A").format('HH:mm'),
            end_time: moment(end_time, "hh:mm A").format('HH:mm'),
            hours: moment(hours, "hh:mm A").format('HH:mm'),
          }
          
          /* Booking Box Model */
          const bookingBox: BookingBoxModel = {
            booking_num: BookingNumGenerate(),
            booking_date:TimeConvert.booking_date,
            start_time:TimeConvert.start_time,
            end_time:TimeConvert.end_time,
            amount:req.body.amount,
            user_id: parseInt(token_decode),
            slot_id:parseInt(req.body.slot_id),
            box_id: parseInt(req.body.box_id)
          }
          console.log("Booking num = = = >",bookingBox['booking_num']);
          console.log("booking Box Payload  - - -- >",bookingBox);
          

          /* Find Box Cricket Using Box Cricket ID */
          let find_box = await DBservice.addboxDBservice.getbox(bookingBox.box_id)
          console.log("Find Box  = = = = = >", find_box);
         
          /* Current Date Greater Than Booking Date Check*/
          if (moment(Date.now()).format('YYYY-MM-DD') > bookingBox["booking_date"]) {
            return response.setResponse(400, { errorMessage: 'This Date Is Expire Select New Date.' }, res, req)
          }
    
          /* Check Booking Already Exits */
          let check_booking = await DBservice.bookDbservice.check_booking(bookingBox["booking_date"], bookingBox["start_time"], bookingBox["end_time"], bookingBox["box_id"], bookingBox["slot_id"])
          console.log("Check Booking = = = >", check_booking);

          await writeConnection.startTransaction() 
  
          /* Check Booking Length */
          if (check_booking.length > 0) {
            response.setResponse(400, { errorMessage: 'Already Book Plese Select New Booking Time.'}, res, req)
          }
          else {
            let result = await DBservice.bookDbservice.bookingbox(bookingBox)
            if(!result){
              await writeConnection.rollback()
              return response.setResponse(400,{errorMessage:'Somthing went erong.'},res,req)
            }
            else{
              let find_user = await DBservice.userDBservice.finduser(parseInt(token_decode))
              console.log("date  = = =>0",booking_date);
          
              // MailServiceBooking(find_user[0].email, find_user[0].username, bookingBox.booking_num,moment(booking_date).format('DD-MM-YYYY'), start_time, end_time, find_box.address,find_box.slot_name,find_box.title, find_box.latitude, find_box.longitude)
              await writeConnection.commit()
              response.setResponse(200, { SuccessMessage: 'Success', data: bookingBox }, res, req)
            }
          }
        } catch (error) {
          await writeConnection.rollback()
          console.log("Booking Error =  =  =  >", error);
          response.setResponse(500, { errorMessage: 'Internal Server Error.' }, res, req)
        }
      }
}

export const Booking_Box_Cricket = new BookingBoxCricket()

// WITH RECURSIVE TimeSlots AS (
//   SELECT 
//       tb.box_id,
//       tb.open_time AS slot_start,
//       ADDTIME(tb.open_time, '02:00:00') AS slot_end,
//       tb.close_time
//   FROM 
//       tbl_box AS tb
//   WHERE 
//       tb.box_id = 1
  
//   UNION ALL

//   SELECT 
//       ts.box_id,
//       ts.slot_end AS slot_start,
//       ADDTIME(ts.slot_end, '02:00:00') AS slot_end,
//       ts.close_time
//   FROM 
//       TimeSlots AS ts
//   WHERE 
//       ts.slot_end < ts.close_time
// )
// SELECT 
//   ts.slot_start,
//   ts.slot_end,
//   CASE 
//       WHEN EXISTS (
//           SELECT 1
//           FROM tbl_booking AS tbo
//           WHERE 
//               tbo.box_id = ts.box_id
//           AND (
//               tbo.start_time < ts.slot_end AND tbo.end_time > ts.slot_start
//           )
//       ) THEN 'Booked'
//       ELSE 'Available'
//   END AS slot_status
// FROM 
//   TimeSlots AS ts;