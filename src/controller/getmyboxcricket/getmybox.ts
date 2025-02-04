import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CookieParser } from "../../comman/cookies";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";

class GetMyBoxCricket {

    public async getmyboxcricket(req: Request, res: Response): Promise<any> {
        try {
            /* User Coookie And Token Verify */
            let cookie_decode: any = CookieParser.UserCookie(req);
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

            let result = await DBservice.getmyboxcricketDBservice.getmybox(token_decode)

            console.log("Result - - - >",result);
            
            if (!result) {
                return response.setResponse(400, { errorMessage: 'Somthing went wrong' }, res, req)
            }
            else {
                response.setResponse(200, { SuccessMessage: 'Success', data: result }, res, req)
            }
        } catch (error) {
            console.log("Get My Box Cricket Error = = = = >",error);
            return response.setResponse(500,{errorMessage:'Internal Server Error'},res,req)
        }
    }

}

export const Get_my_box_cricket = new GetMyBoxCricket()