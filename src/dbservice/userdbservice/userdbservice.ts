import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";


export class UserDBService extends CommanDBService{

    public async registeruser (data:any): Promise<any>{

        let signup_qurey = 'insert into tbl_user SET ?';

        let result = await writeConnection.insert(signup_qurey,[data]);

        return result[0]
    }
    public async checkemail (email:string): Promise<any>{

        let check_mail_qurey = 'select * from tbl_user where email = ?';

        let result = await readConnection.select(check_mail_qurey,[email])

        return result[0]
    }

    public async finduser (user_id:number): Promise<any>{

        let find_user_qurey = 'select * from tbl_user where user_id =?';

        let result = await readConnection.select(find_user_qurey,[user_id])

        return result
    }
}