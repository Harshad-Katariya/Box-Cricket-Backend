let LastNumber=0;
// export function BookingNumGenrate () {

//     const prifix = 'B';
//     LastNumber++;
//     const formattedNum = LastNumber.toString().padStart(6, '0');
//     return prifix + formattedNum;
// }

export const BookingNumGenrate = (length:any) =>{

    let prifix = 'B00';

    for(let i=0; i < length; i++){
        
        prifix+=Math.floor(Math.random() * 20)
    }

    return prifix
}
