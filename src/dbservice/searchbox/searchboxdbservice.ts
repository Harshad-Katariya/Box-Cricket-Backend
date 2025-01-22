import { readConnection } from "../../config/readDbConnection";
import { CommanDBService } from "../commandbservice";

export class SearchBoxDBService extends CommanDBService{

    public async searchbox (data:any): Promise<any>{

        let searchbox_qurey = "SELECT tb.box_id,tb.title,tb.open_time,tb.close_time,tb.address,tci.city_name,ts.state_name,tc.country_name FROM tbl_box as tb LEFT JOIN tbl_country as tc ON tc.country_id  = tb.country_id LEFT JOIN tbl_state as ts ON ts.state_id = tb.state_id LEFT JOIN tbl_city as tci ON tci.city_id = tb.city_id WHERE tci.city_name = ?"

        let result = await readConnection.select(searchbox_qurey,[data])

        return result 
    }
} 

