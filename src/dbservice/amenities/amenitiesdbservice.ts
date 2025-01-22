import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "./../commandbservice";

export class Amenities extends CommanDBService {


    public async amenities(data:any): Promise<any> {

        let amenities_qurey = 'INSERT INTO tbl_amenities SET ?'

        let result = await readConnection.select(amenities_qurey, [data])
    
        return result
    }

    public async addboxamenities (data:any): Promise<any>{

        let add_box_amenities_qurey = 'INSERT INTO tbl_box_amenities SET ?'

        let result = await writeConnection.insert(add_box_amenities_qurey,[data])

        return result
    }

    public async getamenities (data:any):Promise<any>{
        
        let getamenities_qurey = 'SELECT amenities_id,amenities_id,amenities_icon,amenities_name FROM tbl_amenities as ta WHERE ta.is_active = 1'

        let result = await readConnection.select(getamenities_qurey,[data])

        return result
    }
}