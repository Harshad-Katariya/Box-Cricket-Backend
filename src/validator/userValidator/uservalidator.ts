import { check } from "express-validator";

exports.user = () =>{
    return [
    check('username')
    .trim()
    .notEmpty()
    .withMessage('Username Is Require.')
    .escape(),

    check('email')
        .trim()
        .notEmpty()
        .withMessage('Email Is Require.')
        .escape(),
    
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password Is Require.')
        .escape()    
    ]
}

exports.login = () =>{
    return[
        check('email')
        .trim()
        .notEmpty()
        .withMessage('Email Is Require.')
        .escape(),
    
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password Is Require.')
        .escape() 
    ]
}