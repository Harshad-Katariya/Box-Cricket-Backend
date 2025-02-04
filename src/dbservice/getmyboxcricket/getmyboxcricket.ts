import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class Get_My_Box_Cricket  extends CommanDBService {

    public async getmybox (data:any) : Promise<any>{

        let get_my_box = "SELECT tb.box_id,tb.title,tb.address,tb.open_time,tb.close_time,tls.slot_media FROM tbl_box AS tb LEFT JOIN tbl_slot AS tls ON tls.box_id = tb.box_id LEFT JOIN tbl_user as tu ON tu.user_id = tb.user_id WHERE tu.user_id = ? GROUP BY tb.box_id";

        let result = await readConnection.select(get_my_box,[data])

        return result 
    }

}