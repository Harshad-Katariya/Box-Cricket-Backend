import { writeConnection } from "../../config/writeDbConnection"
import { CommanDBService } from "../commandbservice"

 
export class Box_Media extends CommanDBService{

    public async boxmedia (data:any): Promise<any>{

        let media_qurey = 'INSERT INTO tbl_box_media SET ?'

        let result = await writeConnection.insert(media_qurey,[data])

        return result
    }
}