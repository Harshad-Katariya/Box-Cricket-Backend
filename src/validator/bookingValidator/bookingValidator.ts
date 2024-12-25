import { check } from "express-validator";

exports.booking = () => {
    return[
    check('user_id')
        .notEmpty()
        .withMessage('user_id is require')
        .escape(),
    check('box_id')
        .notEmpty()
        .withMessage('box id is require')
        .escape(),
    check('slot_id')
        .notEmpty()
        .withMessage('slot_id is require')
        .escape(),
    check('booking_date')
        .notEmpty()
        .withMessage('booking date is require')
        .escape(),
    check('start_time')
        .notEmpty()
        .withMessage('start time is reqiure')
        .escape(),
    check('end_time')
        .notEmpty()
        .withMessage('end time is require')    
        .escape(),    
    ]
}