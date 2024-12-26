import { Router } from "express";
import { Add_Box } from "../../controller/addBox/addbox";
import { Booking_Box_Cricket } from '../../controller/bookingBox/bookingBox';
import {Add_Box_Slot} from '../../controller/addboxslot/addboxslot';
import  {AvailableTime} from '../../controller/availableTime/availableTime';
import {Get_Booking} from '../../controller/getmybooking/getmybooking'
import { Get_my_box_cricket } from "../../controller/getmyboxcricket/getmybox";
import {is_box_verify} from "../../middleware/is_box";
import {manual_booking} from "../../controller/manualbooking/manualbooking"
const boxcricketValidator = require('../../validator/boxcricketValidator/boxValidator')

class BoxRoute{
    public route: Router = Router()
    constructor(){
        this.config()
    }
    config(){

        /* Add New Box Cricket Route */
        this.route.post('/addbox',Add_Box.addbox)

        /* Add Box Cricket Slot Route */
        this.route.post('/addboxslot',Add_Box_Slot.addboxslot)

        /* Box Cricket Booking Route */
        this.route.post('/booking',Booking_Box_Cricket.bookingBox)

        /* Box Cricket Available Time Route */
        this.route.get('/available',AvailableTime.available_time)

        /* Get My Booking Route*/
        this.route.get('/mybooking',is_box_verify.box_cricket_check,boxcricketValidator.box(),Get_Booking.getmybooking)

        /* Get My Box Cricket Route */
        this.route.get('/myboxcricket',Get_my_box_cricket.getmyboxcricket)

        /* Manual Booking Box Cricket Route*/
        this.route.post('/manualbooking',manual_booking.manualbooking)

        /* Update Route */
        this.route.put('/timeupdate',Add_Box.addboxupdate)
    }
}

const boxRoute = new BoxRoute()
export default boxRoute.route