let LastNumber=0;
export function BookingNumGenrate () {

    const prifix = 'B';
    LastNumber++;
    const formattedNum = LastNumber.toString().padStart(6, '0');
    return prifix + formattedNum;
}
