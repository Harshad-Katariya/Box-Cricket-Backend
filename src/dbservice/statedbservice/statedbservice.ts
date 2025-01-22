import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class State extends CommanDBService{

    public async getallstate (data:any): Promise<any>{

        let get_all_city_qurey = 'SELECT * FROM tbl_state'

        let result = await readConnection.select(get_all_city_qurey,[data])
        
        return result
    }
}