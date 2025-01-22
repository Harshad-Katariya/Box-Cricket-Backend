import { Router } from "express";
import {state}  from "../../controller/getallstate/getallstate";
 
class StateRoute{
    public route: Router = Router()
    constructor(){
        this.config()
    }
    config(): void{
        this.route.get('/getallstate',state.getallstate)
    }
}

const stateRoute = new StateRoute()
export default stateRoute.route