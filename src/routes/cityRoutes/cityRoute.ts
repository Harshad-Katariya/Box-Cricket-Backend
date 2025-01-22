import { Router } from "express";
import { city } from "../../controller/getallcity/getallcity";
 
class CityRoute{
    public route: Router = Router()
    constructor(){
        this.config()
    }
    config(): void{
        this.route.get('/getallcity',city.getallcity)
    }
}

const cityRoute = new CityRoute()
export default cityRoute.route