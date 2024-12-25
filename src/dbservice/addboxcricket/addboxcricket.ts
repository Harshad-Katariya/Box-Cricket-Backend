import { readConnection } from '../../config/readDbConnection';
import {writeConnection} from '../../config/writeDbConnection';
import { CommanDBService } from '../commandbservice';

export class Add_Box_Cricket extends CommanDBService {

    public async addbox (data:any): Promise<any>{

        let add_box_qurey = 'INSERT INTO tbl_box SET ?';

        let result = await writeConnection.insert(add_box_qurey,[data])

        return result
    }
    public async getbox (box_id:number): Promise<any>{
        
        let get_box_qurey = 'SELECT * FROM tbl_box WHERE box_id = ?';

        let result = await readConnection.select(get_box_qurey,[box_id])

        return result[0]
    }
}
 