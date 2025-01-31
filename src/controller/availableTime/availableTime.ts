import { Request, Response } from "express";
import { DBservice } from "../../dbservice/dbservice";
import moment from 'moment';
import { AvailableTimeModel } from '../../model/boxModel/boxCricketModel'
import { response } from "../../helper/response";


class Available_Time {

    // public async available_time(req: Request, res: Response): Promise<any> {
    //     try {

    //         let {date,hours,slot_id,box_id}:any = req.query;
    
    //         let get_avalible_time = await DBservice.availableDBservice.getavalibletime(date,box_id,slot_id)
    //         console.log('get_avalible_time >',get_avalible_time);
            
    //         /* Show Only Available Slot */
    //         const Available_Slot = get_avalible_time.filter(item => item.slot_status === "Available");
    //         let result = []

    //         let box_cricket = await DBservice.addboxDBservice.getboxcricketbyid(box_id)
    //         console.log("box time = = = = = = = = >",box_cricket);
            
    //         /* Get Hours From User */
    //         let hour = hours

    //         if (hour > 1) {
    //             let i = 0
    //             let k = 0
    //             while (k < Available_Slot.length) {
    //                 i = k
    //                 let slot_start = moment(Available_Slot[i]['slot_start'], 'HH:mm').format('hh:mm A')
    //                 let j = 0

                    // while (j < hour - 1) {
                    //     if (Available_Slot[i] && Available_Slot[i + 1] && Available_Slot[i].slot_end == Available_Slot[i + 1].slot_start && moment(Available_Slot[i]['slot_date']).format('YYYY-MM-DD') == moment(Available_Slot[i + 1]['slot_date']).format('YYYY-MM-DD')) {
                    //         console.log("Check data = = = =>", Available_Slot[i + 1]);

                    //         if (hour == (j + 2)) {
                    //             result.push({
                    //                 "slot_start": slot_start,
                    //                 "slot_end": moment(Available_Slot[i + 1].slot_end, 'HH:mm').format('hh:mm A'),
                    //                 "slot_status": "Available"
                    //             })                        
                    //         }
                    //         i = i + 1
                    //         k = i
                    //     }
                    //     j++;
                    // }
    //                 k++;
    //             }
    //         }
    //         else {
    //             let i = 0;
    //             while (i < Available_Slot.length) {
    //                 result.push({
    //                     "slot_start": moment(Available_Slot[i]['slot_start'], 'HH:mm').format('hh:mm A'),
    //                     "slot_end": moment(Available_Slot[i]['slot_end'], 'HH:mm').format('hh:mm A'),
    //                     "slot_status": Available_Slot[i]['slot_status']
    //                 })
    //                 i++;
    //             }   
    //         }
    //         if (result.length > 0) {
    //             response.setResponse(200, { SuccessMessage: 'Success', data: result }, res, req)
    //         }
    //         else{
    //            return response.setResponse(200,{errorMessage:'No Slot Available'},res,req)
    //         }
    //     } catch (error) {
    //         console.log("Error For Available Time = = = >", error);
    //         response.setResponse(500, { errorMessage: 'Internal Server Error.' }, res, req)
    //     }
    // }

    public async available_time(req: Request, res: Response): Promise<any> {
        try {
            let { date, hours, slot_id, box_id }: any = req.query;
    
            let get_avalible_time = await DBservice.availableDBservice.getavalibletime(date, box_id, slot_id);
            // console.log('get_avalible_time >', get_avalible_time);
    
            // Show Only Available Slots
            const Available_Slot = get_avalible_time.filter(item => item.slot_status === "Available");
            let result = [];
            
            let hour = parseInt(hours);
    
            let box_cricket = await DBservice.addboxDBservice.getboxcricketbyid(box_id);
            let box_open_time = box_cricket[0].open_time;
            let box_close_time = box_cricket[0].close_time;
          

            // Convert booked slots to moment intervals for easier overlap checks
            const bookedSlots = get_avalible_time
                .filter(item => item.slot_status !== "Available")
                .map(item => ({
                    start: moment(item.slot_start, 'HH:mm'),
                    end: moment(item.slot_end, 'HH:mm')
                }));
    
            if (hour > 1) {
                let k = 0;
                while (k < Available_Slot.length) {
                    let slot_start = moment(Available_Slot[k]['slot_start'], 'HH:mm');
                    let slot_end = moment(slot_start).add(hour, 'hours'); // Add user-specified duration to the start time
    
                    // Check if the desired slot falls within box timings and does not overlap with booked slots
                    const isWithinBoxTimings =
                        slot_start.isBetween(moment(box_open_time, 'HH:mm'), moment(box_close_time, 'HH:mm'), null, '[)') &&
                        slot_end.isBetween(moment(box_open_time, 'HH:mm'), moment(box_close_time, 'HH:mm'), null, '(]');
                    
                    const isOverlapping = bookedSlots.some(booked =>
                        slot_start.isBefore(booked.end) && slot_end.isAfter(booked.start)
                    );
    
                    if (isWithinBoxTimings && !isOverlapping) {
                        result.push({
                            "slot_start": slot_start.format('hh:mm A'),
                            "slot_end": slot_end.format('hh:mm A'),
                            "price":Available_Slot[0]['price'] * hour,
                            "slot_status": "Available"
                        });
                    }
                    k++;
                }
            } else {
                let i = 0;
                while (i < Available_Slot.length) {
                    let slot_start = moment(Available_Slot[i]['slot_start'], 'HH:mm');
                    let slot_end = moment(Available_Slot[i]['slot_end'], 'HH:mm');
    
                    // Check if the slot is within box timings and does not overlap with booked slots
                    const isWithinBoxTimings =
                        slot_start.isBetween(moment(box_open_time, 'HH:mm'), moment(box_close_time, 'HH:mm'), null, '[)') &&
                        slot_end.isBetween(moment(box_open_time, 'HH:mm'), moment(box_close_time, 'HH:mm'), null, '(]');
                    
                    const isOverlapping = bookedSlots.some(booked =>
                        slot_start.isBefore(booked.end) && slot_end.isAfter(booked.start)
                    );
    
                    if (isWithinBoxTimings && !isOverlapping) {
                        result.push({
                            "slot_start": slot_start.format('hh:mm A'),
                            "slot_end": slot_end.format('hh:mm A'),
                            "price": parseInt(Available_Slot[0]['price']),
                            "slot_status": Available_Slot[i]['slot_status']
                        });
                    }
                    i++;
                }
            }
            if (result.length > 0) {
                response.setResponse(200, { SuccessMessage: 'Success', data: result }, res, req);
            } else {
                return response.setResponse(204, { errorMessage: 'No Slot Available' }, res, req);
            }
        } catch (error) {
            console.log("Error For Available Time = = = >", error);
            response.setResponse(500, { errorMessage: 'Internal Server Error.' }, res, req);
        }
    }
    
    
}
export const AvailableTime = new Available_Time()