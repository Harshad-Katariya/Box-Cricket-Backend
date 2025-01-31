import { readConnection } from "../../config/readDbConnection";
import { writeConnection } from "../../config/writeDbConnection";
import { CommanDBService } from "./../commandbservice";

export class Available_Time extends CommanDBService {


    public async getavalibletime(date: string, box_id: any, slot_id: number): Promise<any> {

        let get_avalible_time_qurey = "WITH DateRange AS (SELECT CURDATE() + INTERVAL (d1.n + d2.n * 10) DAY AS slot_date FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) d1,(SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) d2 WHERE CURDATE() + INTERVAL (d1.n + d2.n * 10) DAY <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)),TimeSlots AS (SELECT dr.slot_date,tb.box_id,tsl.slot_id,tsl.price,ADDTIME(tb.open_time, MAKETIME(hours.n, 0, 0)) AS slot_start,ADDTIME(tb.open_time, MAKETIME(hours.n + 1, 0, 0)) AS slot_end,tb.close_time FROM DateRange AS dr JOIN tbl_box AS tb ON tb.box_id = ? JOIN tbl_slot AS tsl ON tsl.box_id = tb.box_id CROSS JOIN (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14) AS hours WHERE ADDTIME(tb.open_time, MAKETIME(hours.n, 0, 0)) <= tb.close_time) SELECT ts.*,CASE WHEN NOW() > CONCAT(ts.slot_date, ' ', ts.slot_start) THEN 'Over Time' WHEN EXISTS (SELECT 1 FROM tbl_booking AS tbo WHERE tbo.slot_id = ts.slot_id AND tbo.booking_date = ts.slot_date AND (tbo.start_time < ts.slot_end AND tbo.end_time > ts.slot_start)) THEN 'Booked' ELSE 'Available' END AS slot_status FROM TimeSlots AS ts WHERE ts.slot_date = ? AND ts.slot_id = ? ORDER BY ts.slot_date, ts.slot_start;"

        let result = await readConnection.select(get_avalible_time_qurey, [box_id, date, slot_id])
        
        // console.log("Qurey Time= = = =>", get_avalible_time_qurey, [date, box_id]);

        return result
    }
}