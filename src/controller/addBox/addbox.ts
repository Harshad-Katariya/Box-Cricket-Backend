import { Request, Response } from "express";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import moment from 'moment';
import { CookieParser } from "../../comman/cookies";
import jwt from "jsonwebtoken";
import { AddBoxModel, UpdateTimeModel } from '../../model/boxModel/boxCricketModel'
import { writeConnection } from "../../config/writeDbConnection";

class AddBox {

  public async addbox(req: Request, res: Response): Promise<any> {
    try {

      /* User Coookie And Token Verify */
      let cookie_decode = CookieParser.UserCookie(req);
      let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY);

      /* Convert Time  */
      const { open_time, close_time } = req.body;
      const TimeConvert = {
        open_time: moment(open_time, "hh:mm A").format('HH:mm'),
        close_time: moment(close_time, "hh:mm A").format('HH:mm').replace('00:00', '24:00')
      }
      console.log("Date And TIme  = = = == = >", moment(close_time, 'hh:mm A').format('HH:mm a'));

      /* New Box Add Model */
      const AddBox: AddBoxModel = {
        title: req.body.title,
        open_time: TimeConvert.open_time,
        close_time: TimeConvert.close_time,
        address: req.body.address,
        city_id: req.body.city_id,
        state_id: req.body.state_id,
        country_id: req.body.country_id,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        contact_num: req.body.contact_num,
        user_id: parseInt(token_decode)
      }

      /* Add Box */
      let result = await DBservice.addboxDBservice.addbox(AddBox);
      await writeConnection.startTransaction()
      console.log("Resulrr  = =>", result);

      if (!result) {
        await writeConnection.rollback()
        response.setResponse(400, { errorMessage: 'Somthing Went Wrong.' }, res, req)
      }
      else {
        let expire = 30 * 24 * 60 * 60 * 1000
        let token_encode: any = jwt.sign(result.insertId, process.env.JWT_KEY as string)
        res.cookie(process.env.BOX as any, token_encode, { httpOnly: true, domain: process.env.HOST, secure: false, maxAge: expire })
        await writeConnection.commit()
        response.setResponse(200, { SuccessMessage: 'Success', data: AddBox }, res, req)
      }
    } catch (error) {
      console.log("Add Box Error = = = = >", error);
      await writeConnection.rollback()
      response.setResponse(500, { errorMessage: 'Internal Server Error.' }, res, req)
    }
  }

  public async addboxupdate(req: Request, res: Response): Promise<any> {
    try {

      /* Convert Time  */
       const { open_time, close_time } = req.body;
       const TimeConvert = {
          open_time: moment(open_time, "hh:mm A").format('HH:mm'),
          close_time: moment(close_time, "hh:mm A").format('HH:mm').replace('00:00', '24:00')
      }
      const update_time: UpdateTimeModel = {
        open_time: TimeConvert['open_time'],
        close_time: TimeConvert['close_time'],
        box_id: req.body.box_id
      }
  
      let result = DBservice.addboxDBservice.updatetime(update_time['open_time'],update_time['close_time'],update_time['box_id'])
  
      if (!result) {
        return response.setResponse(400, { errorMessage: 'Somthing went wrong' }, res, req)
      }
      else {
        response.setResponse(200, { SuccessMessage: 'Success', data: update_time }, res, req)
      }
    } catch (error) {
      console.log("Box Cricket Time Update Error = = = >",error);
      response.setResponse(500,{errorMessage:'Internal Server Error'},res,req)
    }
  }
}
export const Add_Box = new AddBox()


// if(bookingBox.start_time > bookingBox.end_time){
//    response.setResponse(400, { errorMessage: 'End time not geterthen start time' }, res, req)
// }