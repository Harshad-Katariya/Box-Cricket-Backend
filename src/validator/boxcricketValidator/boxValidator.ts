import { check } from "express-validator";
 
exports.box = () =>{
    return [ 
        check('filter')
        .optional()
        .isIn(['today','yesterday','upcoming','tomorrow'])
        .withMessage('Invalid filter')
        .escape(),
    ]
}
