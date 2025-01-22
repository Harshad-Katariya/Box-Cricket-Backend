import { Request, Response } from "express";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import { CityModel } from '../../model/cityModel/cityModel'
class City {

    public async getallcity (req:Request,res:Response): Promise<any>{
        
        let resp = []

        let result = await DBservice.cityDBservice.getallcity(resp)

        if(!result){
           return response.setResponse(400,{errorMessage:'Somthing went wrong'},res,req)
        }
        else{

            let key =0;
            while(key < result.length){
                const city_data:CityModel = {
                    city_id : result[key]['city_id'],
                    city_name : result[key]['city_name']
                }
                resp.push(city_data)
                key++;
            }
            response.setResponse(200,{SuccessMessage:'Success',data:resp},res,req)
        }
    }
}

export const city = new City()