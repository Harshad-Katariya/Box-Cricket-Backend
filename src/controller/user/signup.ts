import { Request, Response,} from "express";
import { RegisteruserModel } from "../../model/userModel/userModel";
import bcrypt from 'bcryptjs'
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import { validationResult } from "express-validator";

class RegisterUser {

    public async registeruser (req:Request,res:Response): Promise<any>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        try {
            let user_payload:RegisteruserModel = {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            };
            let encode = await bcrypt.hash(user_payload.password,10);
            user_payload.password = encode;
    
            let check_mail = await DBservice.userDBservice.checkemail(req.body.email);
    
            if(check_mail){
                return response.setResponse(400,{errorMessage:'Email Already Register'},res,req)
            }
            else{
                let signup = await DBservice.userDBservice.registeruser(user_payload)
                response.setResponse(200,{SuccessMessage:'Register SuccessFully...',data:user_payload},res,req)
            }
        } catch (error) {
            response.setResponse(500,{errorMessage:'Internal Server Error...'},res,req)
            console.log("Register Error = = = = = = = = = = = >",error);
            
        }
    }
}

/* EJS File View */

export const signup_page = (req:Request,res:Response) =>{
    res.render('signup')
}
export const register_user = new RegisterUser