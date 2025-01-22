import { Request, Response } from "express";
import { CookieParser } from "../../comman/cookies";
import jwt from 'jsonwebtoken'
import { BoxMedia } from "../../model/boxModel/boxCricketModel";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";

class Box_Media {

    public async boxmedia (req:Request,res:Response): Promise<any>{

        /* User Coookie And Token Verify */
        let cookie_decode:any = CookieParser.UserCookie(req);
        let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

        const files:any = req.files as unknown as { [fieldname: string]: Express.Multer.File[] };
        
    
        let media_file:any = []

        let i=0;
        while(i < files.length){
            let data:any = files[i]
            let filePath = data.path.replace(/\\/g, '/');
            filePath = `http://${process.env.HOST}:${process.env.PORT_NUM}/${filePath}`
            media_file.push(filePath)
            i++;
        }
        const box_media:BoxMedia = {
            user_id:parseInt(token_decode),
            box_id:parseInt(req.body.box_id),
            slot_id:parseInt(req.body.slot_id),
            media_path:JSON.stringify(media_file)
        }
        console.log("Box Media = = >",box_media);

        let result = await DBservice.mediaDBservice.boxmedia(box_media)
        if(!result){
            return response.setResponse(400,{errorMesaage:'Somthing Went Wrong'},res,req)
        }
        else{
            response.setResponse(200,{SuccessMessage:'Success',data:box_media},res,req)
        }
    }q
}

export const box_media = new Box_Media