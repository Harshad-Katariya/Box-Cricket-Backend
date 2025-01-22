import { Router } from "express";
import userRoute from './userRoutes/userRoute'
import boxRoute from './boxRoutes/boxRoute';
import amenitiesRoute from '../routes/boxamenitiesRoutes/amenitieRoute';
import cityRoute from './cityRoutes/cityRoute'
import stateRoute from './stateRoutes/stateRoute'
class IndexRoute{
    public route: Router = Router()
    constructor() {
        this.config()
    }
    config(){
        this.route.use('/user',userRoute)
        this.route.use('/box',boxRoute)
        this.route.use('/amenities',amenitiesRoute)
        this.route.use('/city',cityRoute)
        this.route.use('/state',stateRoute)
    }
}

const indexRoute = new IndexRoute()
export default indexRoute.route