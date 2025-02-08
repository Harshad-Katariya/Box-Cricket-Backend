import { UserDBService } from "./userdbservice/userdbservice";
import {BookingDBService} from "./bookingdbservice/bookingdbservice";
import {Add_Box_Cricket} from "./addboxcricket/addboxcricket";
import {Add_Box_Slot} from "./addboxslot/addboxslot";
import { Available_Time } from "./availableTime/availableTime";
import {Get_My_Box_Cricket} from "./getmyboxcricket/getmyboxcricket";
import { Box_Media } from "./boxmedia/boxmediadbservice";
import { Amenities } from "./amenities/amenitiesdbservice";
import { City} from './citydbservice/citydbservice';
import { State} from './statedbservice/statedbservice';
import {PaymentDBService} from './paymentdbservice/paymentdbservice';
import {CancelbookingDBService} from  './cancelbookingdbservice/cancelbookingdbservice'
 class DBService{

    constructor(
        public userDBservice : UserDBService,
        public bookDbservice : BookingDBService,
        public addboxDBservice : Add_Box_Cricket,
        public addslotDBservice : Add_Box_Slot,
        public availableDBservice : Available_Time,
        public getmyboxcricketDBservice : Get_My_Box_Cricket,
        public mediaDBservice :  Box_Media,
        public amenitiesDBservice :Amenities,
        public cityDBservice : City,
        public stateDBservice : State,
        public paymentDBservice : PaymentDBService,
        public cancelbookingDBservice : CancelbookingDBService
    ){}
}

export const DBservice = new DBService(new UserDBService(), new BookingDBService(), new Add_Box_Cricket(), new Add_Box_Slot(), new Available_Time(), new Get_My_Box_Cricket(),new Box_Media(),new Amenities(), new City(), new State(), new PaymentDBService(), new CancelbookingDBService())