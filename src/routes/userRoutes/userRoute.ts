import { Router } from "express";
import {register_user} from '../../controller/user/signup';
import {login_user} from '../../controller/user/login';
const  userValidator = require('../../validator/userValidator/uservalidator')
class UserRoute{
    public route: Router = Router()
    constructor(){
        this.config()
    }
    config(): void{
        this.route.post('/login',login_user.loginuser)
        this.route.post('/signup',userValidator.user(),register_user.registeruser)
    }
}

const userRoute = new UserRoute()
export default userRoute.route