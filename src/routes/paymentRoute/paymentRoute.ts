import { Router } from "express"; 
import { payment } from "../../controller/payment/payment";
 
class PaymentRoute{
    public route: Router = Router()
    constructor(){
        this.config()
    }
    config(): void{
        this.route.post('/initorder',payment.init_order)
        this.route.post('/verify-payment',payment.PaymentVerify)
    }
}

const paymentRoute = new PaymentRoute()
export default paymentRoute.route