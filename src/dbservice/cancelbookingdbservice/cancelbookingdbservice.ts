import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class CancelbookingDBService extends CommanDBService {

    public async cancelbooking (data:any): Promise<any>{

        let cancelbooking_qurey = "DELETE FROM tbl_booking WHERE booking_id = ? AND box_id = ? AND slot_id = ? AND user_id = ?";

        let result = await  writeConnection.insert(cancelbooking_qurey,[data]);

        return result;

    }
}