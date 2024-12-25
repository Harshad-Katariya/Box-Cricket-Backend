export interface AddBoxModel {
    title:string,
    open_time:string,
    close_time:string,
    address:string,
    city_id:number,
    state_id:number,
    country_id:number,
    latitude:number,
    longitude:number,
    contact_num:number,
    user_id :number
}

export interface  BookingBoxModel {
    booking_num:string,
    booking_date: string,
    start_time: string,
    end_time: string,
    mobile_num:string,
    user_id: number,
    slot_id:number,
    box_id: number
}

export interface AddSlotModel {
    slot_name:string,
    width:string,
    heigth:string,
    length:string,
    price:number,
    user_id:number,
    box_id:number
}

export interface AvailableTimeModel {
    date:string,
    slot_id:number,
    hours:number,
    box_id:number
}

export interface GetMyBooking {
    user_id:number,
    box_id:number
}