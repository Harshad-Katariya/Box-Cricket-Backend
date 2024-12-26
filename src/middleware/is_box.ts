import { NextFunction, Request, Response } from "express";
import { DBservice } from "../dbservice/dbservice";
import { response } from "../helper/response";
import { CookieParser } from "../comman/cookies";
import jwt from "jsonwebtoken";

class Is_Box_Cricket_Check {
    
    public async box_cricket_check (req:Request,res:Response,next:NextFunction): Promise<any>{

        let cookie_decode:any = CookieParser.UserCookie(req)
        let token_decode:any = jwt.verify(cookie_decode,process.env.JWT_KEY as string)

        let result  = await DBservice.addboxDBservice.checkBox(parseInt(token_decode))
  
        if(result.length > 0){
            next()
        }
        else{
            return response.setResponse(400,{errorMessage:'Plese Add Box Cricket'},res,req)
        }
    }
}

export const is_box_verify = new Is_Box_Cricket_Check()