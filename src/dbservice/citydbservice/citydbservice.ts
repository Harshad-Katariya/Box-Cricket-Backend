import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class City extends CommanDBService{

    public async getallcity (data:any): Promise<any>{

        let get_all_city_qurey = 'SELECT * FROM tbl_city'

        let result = await readConnection.select(get_all_city_qurey,[data])
        
        return result
    }
}