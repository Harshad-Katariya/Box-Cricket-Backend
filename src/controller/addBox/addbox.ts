import { Request, Response } from "express";
import { DBservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import moment from 'moment';
import { CookieParser } from "../../comman/cookies";
import jwt from "jsonwebtoken";
import { AddBoxModel, GetAllBoxCricket, UpdateTimeModel } from '../../model/boxModel/boxCricketModel'
import { writeConnection } from "../../config/writeDbConnection";
import { validationResult } from "express-validator";

class AddBox {

  public async addbox(req: Request, res: Response): Promise<any> {

    try {
      await writeConnection.startTransaction()
      /* User Coookie And Token Verify */
      let cookie_decode: any = CookieParser.UserCookie(req);
      let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string);

      /* Convert Time  */
      const { open_time, close_time } = req.body;
      const TimeConvert = {
        open_time: moment(open_time, "hh:mm A").format('HH:mm'),
        close_time: moment(close_time, "hh:mm A").format('HH:mm').replace('00:00', '24:00')
      }
      console.log("Date And TIme  = = = == = >", moment(close_time, 'hh:mm A').format('HH:mm a'));

      const slot_media_files = req.files as Express.Multer.File[]; // Adjust based on actual file structure.
      let slot_image_array: string[] = [];

      if (Array.isArray(slot_media_files)) {
        slot_media_files.forEach((file) => {
          let filePath = file.path.replace(/\\/g, '/');
          filePath = `http://${process.env.HOST}:${process.env.PORT_NUM}/${filePath}`;
          slot_image_array.push(filePath);
        });
      } else {
        console.error("Slot media files are not an array:", slot_media_files);
      }


      /* New Box Add Model */
      const AddBox: AddBoxModel = {
        title: req.body.title ? req.body.title : null,
        open_time: TimeConvert.open_time ? req.body.open_time : null,
        close_time: TimeConvert.close_time ? req.body.close_time : null,
        address: req.body.address ? req.body.address : null,
        city_id: parseInt(req.body.city_id),
        state_id: parseInt(req.body.state_id),
        contact_num: req.body.contact_num ? req.body.contact_num : null,
        amenities_id: req.body.amenities_id ? req.body.amenities_id : '[]',
        slot_name: req.body.slot_name ? req.body.slot_name : null,
        slot_media: slot_image_array.length > 0 ? JSON.stringify(slot_image_array) : '[]',
        width: req.body.width ? req.body.width : null,
        heigth: req.body.heigth ? req.body.heigth : null,
        length: req.body.length ? req.body.length : null,
        price: req.body.price ? req.body.price : null,
        box_id: req.body.box_id ? req.body.box_id : null,
        user_id: parseInt(token_decode) || null
      }

      console.log("Chcheck Payloadf = = =  = = = >", AddBox);

      // if(filePath==undefined && filePath==null){
      //   return response.setResponse(400,{errorMessage:'Box Image Not Found'},res,req)
      // }

      /* Add Box */
      let result = await DBservice.addboxDBservice.addbox(AddBox);

      if (!result) {
        await writeConnection.rollback()
        response.setResponse(400, { errorMessage: 'Somthing Went Wrong.' }, res, req)
      }
      else {
        await writeConnection.commit()
        response.setResponse(200, { SuccessMessage: 'Success', data: AddBox }, res, req)
      }
    } catch (error) {
      await writeConnection.rollback()
      console.log("Add Box Error = = = = >", error);
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

      let result = DBservice.addboxDBservice.updatetime(update_time['open_time'], update_time['close_time'], update_time['box_id'])

      if (!result) {
        return response.setResponse(400, { errorMessage: 'Somthing went wrong' }, res, req)
      }
      else {
        response.setResponse(200, { SuccessMessage: 'Success', data: update_time }, res, req)
      }
    } catch (error) {
      console.log("Box Cricket Time Update Error = = = >", error);
      response.setResponse(500, { errorMessage: 'Internal Server Error' }, res, req)
    }
  }
  
  public async getallboxcricket(req: Request, res: Response): Promise<any> {

    let resp: GetAllBoxCricket[] = []

    let result = await DBservice.addboxDBservice.getallboxcricket(resp)

    let i = 0;
    while (i < result.length) {
      let get_all_box = result[i]
      resp.push({
        box_id: get_all_box["box_id"],
        title: get_all_box["title"],
        open_time: get_all_box["open_time"],
        close_time: get_all_box["close_time"],
        address: get_all_box["address"],
        slot_media: get_all_box["slot_media"],
        price: parseInt(get_all_box["price"]),
        contact_num: get_all_box["contact_num"],
        city_name: get_all_box["city_name"],
        state_name: get_all_box["state_name"],
        country_name: get_all_box["country_name"]
      })
      console.log("slot  - - - - - - - - >", resp);
      i++;
    }

    response.setResponse(200, { SuccessMessage: 'Success', data: resp }, res, req)
  }
}
export const Add_Box = new AddBox()
