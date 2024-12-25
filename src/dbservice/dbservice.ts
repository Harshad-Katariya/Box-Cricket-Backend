import { UserDBService } from "./userdbservice/userdbservice";
import {BookingDBService} from "./bookingdbservice/bookingdbservice";
import {Add_Box_Cricket} from "./addboxcricket/addboxcricket";
import {Add_Box_Slot} from "./addboxslot/addboxslot"
import { Available_Time } from "./availableTime/availableTime";
import {Get_My_Box_Cricket} from "./getmyboxcricket/getmyboxcricket"

 class DBService{

    constructor(
        public userDBservice : UserDBService,
        public bookDbservice : BookingDBService,
        public addboxDBservice : Add_Box_Cricket,
        public addslotDBservice : Add_Box_Slot,
        public availableDBservice : Available_Time,
        public getmyboxcricketDBservice : Get_My_Box_Cricket
    ){}
}

export const DBservice = new DBService(new UserDBService(), new BookingDBService(), new Add_Box_Cricket(), new Add_Box_Slot(), new Available_Time(), new Get_My_Box_Cricket())