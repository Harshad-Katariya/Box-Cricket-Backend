import { Request, Response } from "express";
import { CookieParser } from "../../comman/cookies";
import { DBservice } from "../../dbservice/dbservice";
import jwt from "jsonwebtoken";
import { GetboxCricketById, GetMyBooking, SlotModel } from "../../model/boxModel/boxCricketModel";
import { response } from "../../helper/response";
import moment from "moment";
import { validationResult } from "express-validator"; 
import { amenities } from "../amenities/amenities";

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
            let resp:any = []
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
                    // mobile_num: result_data['mobile_num']
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

    public async getboxcricketbiyid (req:Request,res:Response): Promise<any>{

        let data:any = req.query.box_id

        let result = await DBservice.addboxDBservice.getboxcricketbyid(data)

         
        console.log("Check Result From Box Cricket click  = = = = = = = >",result);
         
        let resp_object = {}
        
        for(let i=0; i < result.length; i++){
            
            const box_id = parseInt(result[i].box_id)

            let amenities_icon = result[i].amenities_icon ? result[i].amenities_icon.split(',').map((icon: string) => icon.split('/#/')[1]): [];
            let amenities_name = result[i].amenities_name ? result[i].amenities_name.split(',').map((name: string) => name.split('/#/')[1]): [];
            let amenities_array:any = []

                for(let i=0; i < amenities_icon.length;i++){
                    amenities_array.push({
                        amenities_icon:amenities_icon[i],
                        amenities_name:amenities_name[i]
                    })
                }   

                const slot_data:SlotModel = {
                    slot_id:parseInt(result[i].slot_id),
                    slot_name:result[i].slot_name,
                    slot_media:result[i].slot_media,
                    heigth:result[i].heigth,
                    width:result[i].width,
                    length:result[i].length,
                    price:parseInt(result[i].price)
                }

                if(!resp_object[box_id] && resp_object !=null && resp_object != undefined){
                    resp_object[box_id] = {
                        box_id:result[i].box_id,
                        box_name:result[i].title,
                        box_address:result[i].address,
                        box_open_time:result[i].open_time,
                        box_close_time:result[i].close_time,
                        slots:[],
                        amenitie:amenities_array
                    }
                }

                resp_object[box_id].slots.push(slot_data)
                
        }
        const resp = Object.values(resp_object)
        response.setResponse(200,{SuccessMessage:'Success',data:resp},res,req)
    }
}

export const Get_Booking = new Get_My_Booking()