import { Request, Response } from "express";
import { IconModel } from "../../model/iconModel/iconModel";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import { AddBoxAmenities, GetAmenitiesModel } from "../../model/amenitiesModel/amenitiesModel";
import  jwt from 'jsonwebtoken'
import { CookieParser } from "../../comman/cookies";

class Amenities{

    public async amenities (req:Request,res:Response): Promise<any>{

      const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] };
      const filePath = req.file?.path.replace(/\\/g, '/');

        const icon_payload:IconModel = {
            amenities_icon:`http://${process.env.HOST}:${process.env.PORT_NUM}/${filePath}`,
            amenities_name:req.body.amenities_name
        }

        let result = DBservice.amenitiesDBservice.amenities(icon_payload)

        if(!result){
            response.setResponse(400,{errorMessage:'Somthing Went Wrong.'},res,req)
        }
        else{
            response.setResponse(200,{SuccessMessage:'Success',data:icon_payload},res,req)
        }
    }

    public async addboxamenities (req:Request,res:Response): Promise<any>{

        /* User Coookie And Token Verify */
        let cookie_decode:any = CookieParser.UserCookie(req);
        let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

        /* Amenities Payload With Model */
        const box_amenities:AddBoxAmenities = {
            amenities_id:parseInt(req.body.amenities_id),
            slot_id:parseInt(req.body.slot_id),
            box_id:parseInt(req.body.box_id),
            user_id:parseInt(token_decode)
        }

        let result = DBservice.amenitiesDBservice.addboxamenities(box_amenities)

        if(!result){
            return response.setResponse(400,{errorMessage:'Somthing went wrong'},res,req)
        }
        else{
            response.setResponse(200,{SuccessMessage:'Success',amenities:box_amenities},res,req)
        }
    }

    public async getamenities (req:Request,res:Response): Promise<any>{
        let resp:any = []

        let result =await DBservice.amenitiesDBservice.getamenities(resp)

        if(!result){
            return response.setResponse(400,{errorMessage:'Somthing went worng'},res,req)
        }
        else{
            let i = 0;
            while(i < result.length){
                const amenities_data:GetAmenitiesModel ={
                    amenities_id:result[i]['amenities_id'],
                    amenities_name:result[i]['amenities_name']
                }
                resp.push(amenities_data)
                i++;
            }
            response.setResponse(200,{SuccessMessage:'Success',data:resp},res,req)
        } 
    }
}

export const amenities = new Amenities()