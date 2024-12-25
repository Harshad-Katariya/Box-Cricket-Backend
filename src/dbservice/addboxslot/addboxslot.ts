import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class Add_Box_Slot extends CommanDBService {

    public async addboxslot(data: any): Promise<any> {

        let add_box_slot_qurey = 'INSERT INTO tbl_slot SET ?';

        let result = await writeConnection.insert(add_box_slot_qurey, [data])

        return result
    }
    public async getslot(slot_id: number): Promise<any> {

        let get_slot_qurey = 'SELECT * FROM tbl_slot WHERE slot_id = ?';

        let result = await readConnection.select(get_slot_qurey, [slot_id]);

        return result
    }
}