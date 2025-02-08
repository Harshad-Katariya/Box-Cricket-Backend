import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class Get_My_Box_Cricket  extends CommanDBService {

    public async getmybox (data:any) : Promise<any>{

        let get_my_box = "SELECT tb.box_id,tb.title,tb.address,tb.open_time,tb.close_time,tls.slot_media FROM tbl_box AS tb LEFT JOIN tbl_slot AS tls ON tls.box_id = tb.box_id LEFT JOIN tbl_user as tu ON tu.user_id = tb.user_id WHERE tu.user_id = ? GROUP BY tb.box_id";

        let result = await readConnection.select(get_my_box,[data])

        return result 
    }
    public async getmywallet (user_id:number):Promise<any>{

        let get_my_wallet_qurey = "SELECT CAST(IFNULL((SUM(IF(tt.transaction_type = 'credit', tt.transaction_amount, 0)) - SUM(IF(tt.transaction_type = 'debit', tt.transaction_amount, 0))),0)  AS DECIMAL(10,2)) AS wallet FROM tbl_transaction AS tt LEFT JOIN tbl_box AS tbx ON tbx.box_id = tt.box_id WHERE tbx.user_id = ?;"

        let result = await readConnection.select(get_my_wallet_qurey,[user_id])

        return result[0]
    }
    public async balancewithdrawa (data:any): Promise<any>{
        let balance_withdrawa_qurey = "INSERT INTO tbl_transaction SET ?"

        console.log("ba;ancsp[v==  n jk   - - - >",balance_withdrawa_qurey,data);
        
        let result = await writeConnection.insert(balance_withdrawa_qurey,[data])

        return result
    }
    public async transactionhistory (user_id:number): Promise<any>{

        let transaction_history_qurey = "SELECT tt.transaction_amount,tt.transaction_type,tbx.title,tu.username,tt.date_and_time FROM tbl_transaction AS tt LEFT JOIN tbl_box AS tbx ON tbx.box_id = tt.box_id LEFT JOIN tbl_user as tu On tu.user_id = tt.user_id WHERE tbx.user_id = ? ORDER BY tt.transaction_id DESC;"

        let result = await readConnection.select(transaction_history_qurey,[user_id])

        return result
    }
}