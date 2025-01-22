import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class ManualBookingDBservice extends CommanDBService{

    public async manualbooking (data:any): Promise<any>{
 
       let manual_booking_qurey = 'INSERT INTO tbl_booking SET ?';

       let result = await writeConnection.insert(manual_booking_qurey,[data])

        return result
    }
}