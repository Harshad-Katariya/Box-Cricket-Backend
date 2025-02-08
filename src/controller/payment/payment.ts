import { Request, Response } from "express";
import Razorpay from "razorpay";
import { response } from "../../helper/response";
import { DBservice } from "../../dbservice/dbservice";
import { CookieParser } from "../../comman/cookies";
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import { PaymentGateWay, TransactionModel } from "../../model/paymentModel/paymentModel";
import moment from "moment";

const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY as string,
    key_secret: process.env.RAZOR_PAY_SEC as string
});

class Payment {

    public async init_order(req: Request, res: Response): Promise<any> {
        /* User Coookie And Token Verify */
        let cookie_decode: any = CookieParser.UserCookie(req);
        let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);


        console.log("Toker - - - >", token_decode);

        try {
            let amount: any = req.body.amount
            let options: any = {
                amount: amount * 100,
                currency: 'INR'
            }
            razorpay.orders.create(options, async (err: any, order: any) => {
                if (err) {
                    console.log(err)
                    res.send({ data: err })
                }
                else {
                    const payment_payload: PaymentGateWay = {
                        razorpay_order_id: order.id,
                        payment_amount: amount.toFixed(2),
                        box_id: parseInt(req.body.box_id),
                        slot_id: parseInt(req.body.slot_id),
                        user_id: parseInt(token_decode)
                    }
                    console.log("Order Log = = = == = == >", order);

                    console.log("Data  = = = = = = = = = = = = = = = = = = >", await razorpay.orders.fetch(order.id))

                    await DBservice.paymentDBservice.payment(payment_payload)
                    response.setResponse(200, { message: 'Order Create', data: payment_payload }, res, req)
                }
            })
        }
        catch (error) {
            console.log("Payment Error =====--->", error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }
    }
    public async PaymentVerify(req: Request, res: Response): Promise<any> {
        try {

            /* User Coookie And Token Verify */
            let cookie_decode: any = CookieParser.UserCookie(req);
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

            let result = await DBservice.paymentDBservice.paymentcheck(parseInt(token_decode))

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

            let cancel_payment = await razorpay.orders.fetchPayments(result.razorpay_order_id)

            const razorpay_key: any = process.env.RAZOR_PAY_SEC

            let hmac = crypto.createHmac('sha256', razorpay_key)

            hmac.update(razorpay_order_id + "|" + razorpay_payment_id)

            const genrated_signature = hmac.digest('hex')
            if (!razorpay_payment_id) {
                await DBservice.paymentDBservice.paymentfail(parseInt(token_decode), result.payment_id)
                await DBservice.paymentDBservice.cancelpayment(cancel_payment.items[0].error_description, parseInt(token_decode), parseInt(result.payment_id))
                return response.setResponse(402, { message: `${cancel_payment.items[0].error_description}` }, res, req)
            }
            if (razorpay_signature == genrated_signature) {

                let paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
                const capture_amount: any = paymentDetails.amount

                let payment_capture = await razorpay.payments.capture(razorpay_payment_id, capture_amount, "INR")
                if (payment_capture?.id) {

                    let payment_order = await razorpay.orders.fetch(razorpay_order_id)
                    let payment = await razorpay.payments.fetch(payment_capture.id)

                    if (payment_order.status == 'paid' && payment.status == 'captured') {
                        await DBservice.paymentDBservice.paymentcomplate(parseInt(token_decode), result.payment_id)
                         let payment_amount = Number(result["payment_amount"]);
                        let gstsubstct:any = payment_amount / 1.18
                        const transaction_payload: TransactionModel = {
                            transaction_amount: gstsubstct.toFixed(2),
                            transaction_type: "credit",
                            box_id: result['box_id'],
                            date_and_time:moment().format('DD-MM-YYYY hh:mm:ss A'),
                            user_id: parseInt(token_decode)
                        }
                        await DBservice.paymentDBservice.transaction(transaction_payload)
                    }
                    else {
                        await DBservice.paymentDBservice.paymentfail(parseInt(token_decode), result.payment_id)
                        await DBservice.paymentDBservice.cancelpayment(cancel_payment.items[0].error_description, parseInt(token_decode), parseInt(result.payment_id))
                        return response.setResponse(402, { message: 'Payment Fail...' }, res, req)
                    }
                }
                response.setResponse(200, { message: 'Payment Verify...' }, res, req)
            }
            else {
                response.setResponse(400, { message: 'Payment Fail....' }, res, req)
                await DBservice.paymentDBservice.paymentfail(parseInt(token_decode), result.payment_id)
                await DBservice.paymentDBservice.cancelpayment(cancel_payment.items[0].error_description, parseInt(token_decode), result.payment_id)
            }
        } catch (error) {

            console.log("Payment Error ====>", error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }

    }

}

export const payment = new Payment()

