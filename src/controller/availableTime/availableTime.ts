import { Request, Response } from "express";
import { DBservice } from "../../dbservice/dbservice";
import moment from 'moment';
import { AvailableTimeModel } from '../../model/boxModel/bookingModel'
import { response } from "../../helper/response";


class Available_Time {

    public async available_time(req: Request, res: Response): Promise<any> {
        try {
            
            /* Available Time Payload */
            const Available_Time: AvailableTimeModel = {
                date: moment(req.body.date, 'DD-MM-YYYY').format("YYYY-MM-DD"),
                hours: req.body.hours,
                slot_id: req.body.slot_id,
                box_id: req.body.box_id
            }
            let get_avalible_time = await DBservice.availableDBservice.getavalibletime(Available_Time['date'], Available_Time['box_id'], Available_Time['slot_id'])

            /* Show Only Available Slot */
            const Available_Slot = get_avalible_time.filter(item => item.slot_status === "Available");
            let result = []

            /* Get Hours From User */
            let hour = Available_Time['hours']
    
            if(hour > 1){
            let i = 0
            let k = 0
                while (k < Available_Slot.length) {
                    i = k
                    let slot_start = moment(Available_Slot[i]['slot_start'], 'HH:mm').format('hh:mm A')
                    let j = 0
    
                    
                        while (j < hour - 1) {
                            if (Available_Slot[i] && Available_Slot[i + 1] && Available_Slot[i].slot_end === Available_Slot[i + 1].slot_start && moment(Available_Slot[i]['slot_date']).format('YYYY-MM-DD') === moment(Available_Slot[i + 1]['slot_date']).format('YYYY-MM-DD')) {
                                console.log("Check data = = = =>",Available_Slot[i + 1]);
                                
                                if (hour == (j + 2)) {
                                    result.push({
                                        "slot_date": moment(Available_Slot[i]['slot_date']).format('DD-MM-YYYY'),
                                        "box_id": Available_Slot[i].box_id,
                                        "slot_start": slot_start,
                                        "slot_end": moment(Available_Slot[i + 1].slot_end, 'HH:mm').format('hh:mm A'),
                                        "slot_status": "Available"
                                    })
                                }
                                i = i + 1
                                k = i
                            }
                            j++;
                        }
                    k++;
                }
            }
           else{
            let i=0;
            while (i < Available_Slot.length) {
                result.push({
                    "slot_date": moment(Available_Slot[i]['slot_date']).format('DD-MM-YYYY'),
                    "box_id": Available_Slot[i].box_id,
                    "slot_start": moment(Available_Slot[i]['slot_start'], 'HH:mm').format('hh:mm A'),
                    "slot_end": moment(Available_Slot[i]['slot_end'], 'HH:mm').format('hh:mm A'),
                    "slot_status": Available_Slot[i]['slot_status']
                })
                i++;
            }
           }
            if (result.length > 0) {
                response.setResponse(200, { SuccessMessage: 'Success', data: result }, res, req)
            }
            else {
                return response.setResponse(400, { errorMessage: 'Today booking slots not available' }, res, req)
            }
        } catch (error) {
            console.log("Error For Available Time = = = >", error);
            response.setResponse(500, { errorMessage: 'Internal Server Error.' }, res, req)
        }
    }
}
export const AvailableTime = new Available_Time()