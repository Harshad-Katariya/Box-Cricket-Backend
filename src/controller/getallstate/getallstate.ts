import { Request, Response } from "express";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import { StateModel } from "../../model/stateModel/stateModel";

class State {

    public async getallstate (req:Request,res:Response): Promise<any>{

        let resp:any = []

        let result = await DBservice.stateDBservice.getallstate(resp)

        if(!result){
            return response.setResponse(400,{errorMessage:'Somthing went wrong'},res,req)
        }
        else{
            let key=0;
            while(key < result.length){
                const state_data:StateModel = {
                    state_id : result[key]['state_id'],
                    state_name: result[key]['state_name']
                }
                resp.push(state_data)
                key++;
            }
            response.setResponse(200,{SuccessMessage:'Success',data:resp},res,req)
        }
    }
}

export const state = new State()