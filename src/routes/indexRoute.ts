import { Router } from "express";
import userRoute from './userRoutes/userRoute'
import boxRoute from './boxRoutes/boxRoute'

class IndexRoute{
    public route: Router = Router()
    constructor() {
        this.config()
    }
    config(){
        this.route.use('/user',userRoute)
        this.route.use('/box',boxRoute)
    }
}

const indexRoute = new IndexRoute()
export default indexRoute.route