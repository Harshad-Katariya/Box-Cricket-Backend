
export const BookingNumGenerate = () => { 
    let prefix = 'B';  
    let number = '';

    for (let i = 0; i < 4; i++) {  
        number += Math.floor(Math.random() * 10);
    }

    return prefix + number;
};