import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class Get_My_Box_Cricket {

    public async getmybox (data:any) : Promise<any>{

        let get_my_box = "SELECT tob.box_id,tob.title,tob.open_time,tob.close_time FROM tbl_box as tob WHERE tob.user_id = ?";

        let result = await readConnection.select(get_my_box,[data])

        return result 
    }

}