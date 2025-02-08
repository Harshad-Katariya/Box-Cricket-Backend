export interface AddBoxModel {
    title: string,
    open_time: string,
    close_time: string,
    address: string,
    city_id: number,
    state_id: number,
    contact_num: number,
    amenities_id:number,
    box_id:number,
    slot_name: string,
    slot_media:string,
    width:string,
    heigth:string,
    length:string,
    price: number,
    user_id: number
}

export interface BookingBoxModel {
    booking_num: string,
    booking_date: string,
    start_time: string,
    end_time: string,
    amount:number,
    user_id: number,
    slot_id: number,
    box_id: number
}

export interface AddSlotModel {
    slot_name: string,
    slot_media:string,
    width: string,
    heigth: string,
    length: string,
    price:number,
    user_id: number,
    box_id: number
}

export interface AvailableTimeModel {
    // date: string,
    // slot_id: number,
    // hours: number,
    // box_id: number
}

export interface SlotModel{
    slot_id:number,
    slot_name:string,
    slot_media:string,
    width:string,
    heigth:string,
    length:string,
    price:number,
}

export interface GetMyBooking {
    box_id: number
}

export interface GetAllBoxCricket {
    box_id:number,
    title:string,
    open_time:string,   
    close_time: string,
    address:string,
    slot_media: string[] | [],
    price:number,
    contact_num:string,
    city_name:string,
    state_name:string,
    country_name:string
}


export interface BoxMedia {
    user_id:number,
    box_id:number,
    slot_id:number,
    media_path:string
}
 
export interface GetboxCricketById{
    box_id:number,
    amenitie:string,
    slot_id:number,
    slot_name:string,
    slot_media:string,
    width:string,
    heigth:string,
    length:string,
    price:string,

}


/* Update Box Cricket Model */
export interface UpdateTimeModel {
    open_time: string,
    close_time: string,
    box_id: number,
}

export interface CancelbookingModel{
    box_id:number,
    slot_id:number,
    user_id:number
}