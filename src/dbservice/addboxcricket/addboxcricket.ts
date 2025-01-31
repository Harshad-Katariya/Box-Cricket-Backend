import { readConnection } from '../../config/readDbConnection';
import { writeConnection } from '../../config/writeDbConnection';
import { CommanDBService } from '../commandbservice';
import { DBservice } from '../dbservice';

export class Add_Box_Cricket extends CommanDBService {

    public async addbox(data: any): Promise<any> {

        let add_box_qurey = 'INSERT INTO tbl_box SET ?';

        console.log("All Data = = = == = = = >",data);
        

        let addBoxdata = {
            title: data['title'],
            open_time: data['open_time'],
            close_time: data['close_time'],
            address: data['address'],
            city_id: data['city_id'],
            state_id: data['state_id'],
            contact_num: data['contact_num'],
            user_id: data['user_id']
        }

        let result = await writeConnection.insert(add_box_qurey, [addBoxdata])

        console.log("Amienisvn D  = = = >>", data);

        const amenities = typeof data['amenities_id'] === 'string' ? data['amenities_id'].split(',').map((id: string) => id.trim()) : Array.isArray(data['amenities_id']) ? data['amenities_id'] : [];

        console.log("Amenise djdd-djsdjs = = = =  = = = ==  = == = = = = = == = = == = = = = == = = = =>", amenities);

        const addAmenitiesdata = amenities.map((amenity_id: any) => [
            parseInt(amenity_id),
            parseInt(result.insertId),
            parseInt(data['user_id']),
        ]);

        if (addAmenitiesdata.length > 0) {
            let add_box_amenities_query = 'INSERT INTO tbl_box_amenities (amenities_id, box_id, user_id) VALUES ?';
            await writeConnection.insert(add_box_amenities_query, [addAmenitiesdata]);
        }

        let addslotData = {
            slot_name: data['slot_name'],
            slot_media: data['slot_media'],
            width:data['width'],
            heigth:data['heigth'],
            length:data['length'],
            price:data['price'],
            box_id:parseInt(result.insertId),
            user_id:parseInt(data['user_id'])
        }
        console.log("Add Slot Payload = = =  = =  = = == = = = = == = =  = = == = = =  = = = = = = = = = =  = = = >",data);
        

        let addslot_qurey = 'INSERT INTO tbl_slot SET ?'
        await writeConnection.insert(addslot_qurey,[addslotData]) 
        console.log("Add Amenities = = = >", addAmenitiesdata);
        return result
    }
    public async getbox(box_id: number): Promise<any> {

        let get_box_qurey = 'SELECT tbx.box_id,tbx.title,tbx.open_time,tbx.close_time,tbx.address,tbx.latitude,tbx.longitude,ts.slot_id,ts.slot_name FROM tbl_box as tbx LEFT JOIN tbl_slot as ts ON ts.box_id = tbx.box_id WHERE tbx.box_id = ?';

        let result = await readConnection.select(get_box_qurey, [box_id])

        return result[0]
    }
    public async getallboxcricket(data: any): Promise<any> {

        let get_all_box_cricket_qurey = "SELECT tb.box_id,tb.title,tb.open_time,tb.close_time,tb.address,tls.slot_media,tls.price,tb.contact_num,tc.city_name,ts.state_name FROM tbl_box AS tb LEFT JOIN tbl_city AS tc ON tc.city_id = tb.city_id LEFT JOIN tbl_state AS ts ON ts.state_id = tb.state_id LEFT JOIN tbl_slot AS tls ON tls.box_id = tb.box_id GROUP BY tb.box_id";

        let result = await readConnection.select(get_all_box_cricket_qurey, [data]);
    
        return result
    }
    public async getboxcricketbyid(box_id: number): Promise<any> {

        let get_box_cricket_qurey = `SELECT tb.box_id,tb.title,tb.address,tb.open_time,tb.close_time,GROUP_CONCAT(DISTINCT CONCAT(ta.amenities_id,'/#/',ta.amenities_icon) ORDER BY ta.amenities_id ASC) as amenities_icon,GROUP_CONCAT(DISTINCT CONCAT(ta.amenities_id,'/#/',ta.amenities_name) ORDER BY ta.amenities_id ASC) as amenities_name,tls.slot_id,tls.slot_name,tls.slot_media,tls.width,tls.heigth,tls.length,tls.price,tb.contact_num,tc.city_name,ts.state_name FROM tbl_box AS tb LEFT JOIN tbl_city AS tc ON tc.city_id = tb.city_id LEFT JOIN tbl_state AS ts ON ts.state_id = tb.state_id LEFT JOIN tbl_slot AS tls ON tls.box_id = tb.box_id LEFT JOIN tbl_box_amenities AS tba ON tba.box_id = tb.box_id LEFT JOIN tbl_amenities AS ta ON ta.amenities_id = tba.amenities_id WHERE tb.box_id = ? GROUP BY tls.slot_id`

        let result = await readConnection.select(get_box_cricket_qurey, [box_id])

        return result
    }
    public async checkBox(user_id: number): Promise<any> {

        let check_box_qurey = 'SELECT * FROM tbl_box WHERE user_id = ?'

        let result = await readConnection.select(check_box_qurey, [user_id])

        return result
    }



    /* Update */

    public async updatetime(open_time: any, close_time: any, box_id: number): Promise<any> {

        let update_time_qurey = 'UPDATE tbl_box SET open_time = ?,close_time = ? WHERE box_id = ?'

        let result = await writeConnection.update(update_time_qurey, [open_time, close_time, box_id])

        console.log("resulr  = = = = = = = = = = >", result);
        return result
    }
}
