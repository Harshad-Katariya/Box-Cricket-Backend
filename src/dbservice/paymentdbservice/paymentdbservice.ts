import { readConnection } from "../../config/readDbConnection";
import { CommanDBService } from "../commandbservice";
import { writeConnection } from "../../config/writeDbConnection";

export class PaymentDBService extends CommanDBService{

    public async payment (data: any): Promise<any> {

        let payment_qurey = `INSERT INTO tbl_payment SET ?`;

        let result = await writeConnection.insert(payment_qurey, [data])

        return result
    }   

    public async paymentcheck (user_id:number): Promise<any>{

        let payment_check = `SELECT * FROM tbl_payment WHERE user_id = ? ORDER BY payment_id DESC LIMIT 1`

        let result = await readConnection.select(payment_check,[user_id])

        return result[0]
    }

    public async paymentcomplate (user_id: any,payment_id:number): Promise<any> {
        let premium_complate_qurey = 'UPDATE tbl_payment SET payment_status = "complate" WHERE user_id = ? AND payment_id = ?'

        let result = await writeConnection.update(premium_complate_qurey, [user_id,payment_id])

        return result
    }

    public async paymentfail (user_id:number,payment_id:number): Promise<any>{

        let payment_fail_qurey = 'UPDATE tbl_payment SET payment_status = "fail" WHERE user_id = ? AND payment_id = ?'

        let result = await writeConnection.update(payment_fail_qurey,[user_id,payment_id])

        return result
    }

    public async cancelpayment (cancel_payment:any,user_id:number,payment_id:number): Promise<any>{

        let cancel_payment_reason_qurey = 'UPDATE tbl_payment SET cancel_reason = ? WHERE user_id = ? AND payment_id = ?'

        let result = await writeConnection.update(cancel_payment_reason_qurey,[cancel_payment,user_id,payment_id])

        return result
    }

    public async transaction (data:any): Promise<any>{
       
        let transaction_qurey = 'INSERT INTO tbl_transaction SET ?'

        let result = await writeConnection.insert(transaction_qurey,[data])

        return result
    }
    public async wallet (wallet:any,box_id:number): Promise<any>{

        let wallter_qurey = "UPDATE tbl_box SET wallet = ? WHERE box_id = ?";

        let result = await writeConnection.update(wallter_qurey,[wallet,box_id]);

        return result
    }
}