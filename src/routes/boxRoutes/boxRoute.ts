import { Router } from "express";
import { Add_Box } from "../../controller/addBox/addbox";
import { Booking_Box_Cricket } from '../../controller/bookingBox/bookingBox';
import {Add_Box_Slot} from '../../controller/addboxslot/addboxslot';
import  {AvailableTime} from '../../controller/availableTime/availableTime';
import {Get_Booking} from '../../controller/getmybooking/getmybooking'
import { Get_my_box_cricket } from "../../controller/getmyboxcricket/getmybox";
import {is_box_verify} from "../../middleware/is_box";
import {IS_Verify} from "../../middleware/is_verify";
import {manual_booking} from "../../controller/manualbooking/manualbooking"
import {box_image} from "../../middleware/fileupload"
import { box_media } from "../../controller/boxmedia/boxmediia";
import { box_media_upload } from "../../middleware/mediaUpload";

const boxcricketValidator = require('../../validator/boxcricketValidator/boxValidator')

class BoxRoute{
    public route: Router = Router()
    constructor(){
        this.config()
    }
    config(){

        /* Add New Box Cricket Route */
        this.route.post('/addbox',box_media_upload.array('slot_media'),Add_Box.addbox)

        /* Add Box Cricket Slot Route */
        this.route.post('/addboxslot',box_media_upload.array('slot_media'),Add_Box_Slot.addboxslot)

        /* Box Cricket Booking Route */
        this.route.post('/booking',Booking_Box_Cricket.bookingBox)

        /* Box Cricket Available Time Route */
        this.route.get('/available',AvailableTime.available_time)

        /* Get My Booking Route*/
        this.route.get('/mybooking',boxcricketValidator.box(),Get_Booking.getmybooking)

        /* Get My Box Cricket Route */
        this.route.get('/myboxcricket',Get_my_box_cricket.getmyboxcricket)

        /* Manual Booking Box Cricket Route*/
        this.route.post('/manualbooking',manual_booking.manualbooking)

        /* Get All Box Cricket Route */
        this.route.get('/getallboxcricket',Add_Box.getallboxcricket)

        /* Get Box Cricket By Id Route*/
        this.route.get('/getboxcricketbyid',Get_Booking.getboxcricketbiyid)

        /* Box Cricket Media Upload Route */
        this.route.post('/media',box_media_upload.array('media_path'),box_media.boxmedia)

        /* Update Route */
        this.route.put('/timeupdate',Add_Box.addboxupdate)
    }
}

const boxRoute = new BoxRoute()
export default boxRoute.route