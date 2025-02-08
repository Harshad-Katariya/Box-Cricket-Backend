import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "../commandbservice";
import moment from "moment";

export class BookingDBService extends CommanDBService {

    public async bookingbox(data: any): Promise<any> {

        let booking_box_qurey = 'INSERT INTO tbl_booking SET ?';

        let result = await writeConnection.insert(booking_box_qurey, [data])

        return result
    }

    public async check_booking(booking_date: any, start_time: any, end_time: any, box_id: any, slot_id: any): Promise<any> {

        start_time = moment(start_time, 'HH:mm').add(1, 'minute').format('HH:mm');
        const get_booking_qurey = "SELECT booking_id, booking_date, start_time, end_time, box_id, slot_id FROM tbl_booking WHERE booking_date = ? AND ((? BETWEEN start_time AND end_time OR ? BETWEEN start_time AND end_time) OR (start_time BETWEEN ? AND ? AND end_time BETWEEN ? AND ?)) AND box_id = ? AND slot_id = ?;"

        let result = await readConnection.select(get_booking_qurey, [booking_date, start_time, end_time, start_time, end_time, start_time, end_time, box_id, slot_id])

        console.log("Get Booking Qurey = = >", get_booking_qurey, [booking_date, start_time, end_time, start_time, end_time, start_time, end_time, box_id, slot_id]);

        return result
    }

    public async getmybooking(box_id:any, data: any): Promise<any> {

        let get_my_booking = "SELECT tob.booking_num,tob.booking_date,tob.start_time,tob.end_time,tob.amount,ts.slot_name,tu.username FROM tbl_booking AS tob LEFT JOIN tbl_box AS tb ON tb.box_id = tob.box_id LEFT JOIN tbl_slot AS ts ON ts.slot_id = tob.slot_id LEFT JOIN tbl_user AS tu ON tu.user_id = tob.user_id WHERE tob.box_id = ?"

        let Get_Date = moment().format('YYYY-MM-DD')

        if (data.filter === 'today') {
            get_my_booking += ` AND tob.booking_date = "${Get_Date}" ORDER BY tob.start_time ASC`
            console.log("Current Date = = = =>", Get_Date);
            console.log("Qurey Check = = =>",get_my_booking);
            
        }
        else if (data.filter === "yesterday") {
            Get_Date = moment().subtract(1, "days").format('YYYY-MM-DD')
            get_my_booking += ` AND tob.booking_date = "${Get_Date}" ORDER BY tob.start_time ASC`
            console.log("Yesterday = = = = >", Get_Date);
        }
        else if (data.filter === 'tomorrow') {
            Get_Date = moment().add(1, "days").format('YYYY-MM-DD')
            get_my_booking += ` AND tob.booking_date = "${Get_Date}" ORDER BY tob.start_time ASC`
        }
        else if (data.filter === 'upcoming') {
            get_my_booking += " AND tob.booking_date > CURRENT_DATE() ORDER BY tob.start_time ASC"
        }
        if(data.q){
            get_my_booking += ` AND lower(tob.booking_num) LIKE "%${data.q.toLowerCase().trim()}%"`
        }

        console.log("Qurey log - - - - >",get_my_booking,data);
        
        let result = await readConnection.select(get_my_booking, [box_id, data])
        return result
    }
}

