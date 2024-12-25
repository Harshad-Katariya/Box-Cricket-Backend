import { Request, Response,} from "express";
import { DBservice } from "../../dbservice/dbservice";
import {LoginUserModel} from '../../model/userModel/userModel';
import bcrypt from 'bcryptjs';
import { response } from "../../helper/response";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'

class LoginUser {
    
    public async loginuser (req:Request,res:Response): Promise<any>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

       try {
         let user_email_check = await DBservice.userDBservice.checkemail(req.body.email)
 
         const User_Login:LoginUserModel = {
             email:req.body.email,
             password:req.body.password
         }
        
         if(user_email_check){
             let password_match = await bcrypt.compare(User_Login.password,user_email_check.password)
             let expire = 30 * 24 * 60 * 60 * 1000
             if(password_match){
                let token_encode:any = jwt.sign(user_email_check.user_id,process.env.JWT_KEY as string)
                res.cookie(process.env.COOKIE_USER as any, token_encode, { httpOnly: true, domain:process.env.HOST,secure:false, maxAge: expire}) 
                 response.setResponse(200,{SuccessMessage:'Login SuccessFully'},res,req)
             }
             else{
                 response.setResponse(400,{errorMessage:'Invalid Email And Password'},res,req)
             }  
         }
         else{
             response.setResponse(400,{errorMessage:'Invalid Email And Password'},res,req)
         }
         console.log("User = = = = >",user_email_check,process.env.HOST);
       } catch (error) {
            console.log("Login Error = = = = = = >",error); 
            response.setResponse(500,{errorMessage:'Internal Server Error'},res,req)
       }
    }
}

export const login_user = new LoginUser()
