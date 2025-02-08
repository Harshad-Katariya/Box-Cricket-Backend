import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CookieParser } from "../../comman/cookies";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import { TransactionModel } from "../../model/paymentModel/paymentModel";
import { writeConnection } from "../../config/writeDbConnection";
import moment from "moment";

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

    public async getmywallet(req:Request,res:Response): Promise<any>{

         /* User Coookie And Token Verify */
         let cookie_decode: any = CookieParser.UserCookie(req);
         let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

         let result = await DBservice.getmyboxcricketDBservice.getmywallet(parseInt(token_decode))
        
         if(!result){
           return response.setResponse(400,{errorMessage:'Somthing Went Wrong.'},res,req)
         }
         else{
            response.setResponse(200,{SuccessMessage:'Success',data:result},res,req)
         }
    }

    public async withdrawa_balance(req: Request, res: Response): Promise<any> {
        try {
            /* User Cookie And Token Verify */
            let cookie_decode: any = CookieParser.UserCookie(req);
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);
    
            let get_balance = await DBservice.getmyboxcricketDBservice.getmywallet(parseInt(token_decode));
            
            let wallet_amount = parseInt(get_balance["wallet"])
            if (!get_balance || get_balance.wallet === null || get_balance.wallet === 0) {
                return response.setResponse(400, { errorMessage: 'Minimum wallet balance must be greater than ₹1.' }, res, req);
            }
            // else{
            //     response.setResponse(404,{errorMessage:'Balance Not Found..'},res,req)
            // }
            const balance_withdrawa: TransactionModel = {
                transaction_amount: req.body.transaction_amount.toFixed(2),
                transaction_type: "debit",
                box_id: req.body.box_id,
                date_and_time:moment().format('DD-MM-YYYY hh:mm:ss A'),
                user_id: parseInt(token_decode)
            };
            
            if(wallet_amount < balance_withdrawa["transaction_amount"]){
                return response.setResponse(400,{errorMessage:'Insufficient balance.'},res,req)
            }
            let result = await DBservice.getmyboxcricketDBservice.balancewithdrawa(balance_withdrawa);
    
            if (!result) {
                return response.setResponse(400, { errorMessage: 'Something went wrong' }, res, req);
            }
    
            return response.setResponse(200, { message: 'Withdrawal successful' }, res, req);
    
        } catch (error) {
            console.log("withdrawa_balance ->", error);
            response.setResponse(500, { errorMessage: 'Internal Server Error' }, res, req);
        }
    }
    
    public async transaction_history (req:Request,res:Response): Promise<any>{
        try {

              /* User Cookie And Token Verify */
              let cookie_decode: any = CookieParser.UserCookie(req);
              let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);
    
              let result = await DBservice.getmyboxcricketDBservice.transactionhistory(parseInt(token_decode))
            

              console.log("Trans Histppry  = = = =  = = >",result);
              
              if(!result){
                return response.setResponse(400,{errorMessage:"Somthing Went Wrong"},res,req)
              }
              else{

                if(result.length > 0){
                    response.setResponse(200,{SuccessMessage:'Success',data:result},res,req)
                }
                else{
                    return response.setResponse(404,{errorMessage:'No Transaction History Found'},res,req)
                }
                   
              }
        } catch (error) {
            response.setResponse(500,{errorMessage:'Internal Server Error'},res,req)
            console.log("transaction history Error = = = = = >",error);
            
        }   
    }
}

export const Get_my_box_cricket = new GetMyBoxCricket()