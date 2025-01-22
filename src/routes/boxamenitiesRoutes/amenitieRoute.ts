import { Router } from "express";
import { amenities } from "../../controller/amenities/amenities";
import { icon_media } from "../../middleware/iconupload";

class AmenitiesRoute{
    public route: Router = Router()
    constructor() {
        this.config()
    }
    config(){
        this.route.post('/iconupload',icon_media.single('amenities_icon'),amenities.amenities)
        this.route.post('/boxamenities',amenities.addboxamenities)
        this.route.get('/getamenities',amenities.getamenities)
    }
}

const amenitiesRoute = new AmenitiesRoute()
export default amenitiesRoute.route