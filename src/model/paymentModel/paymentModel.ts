export interface PaymentGateWay{
    razorpay_order_id :string,
    payment_amount:number,
    box_id:number,
    slot_id:number,
    user_id:number
}

export interface TransactionModel  {
    transaction_amount:number,
    transaction_type:string,
    box_id:number,
    date_and_time:string,
    user_id:number
}

// export interface TransactionDModel  {
//     transaction_amount:number,
//     // transaction_type:string,
//     box_id:number,
//     user_id:number
// }