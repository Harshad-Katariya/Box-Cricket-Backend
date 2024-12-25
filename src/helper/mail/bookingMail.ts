import nodemailer from 'nodemailer';
import fs, { readFileSync } from 'fs'
import path from 'path';
const emailTemplatePath = path.join(__dirname, '../../helper/mail/mailTemplate.html');

const template = fs.readFileSync(emailTemplatePath, 'utf-8')
export const MailServiceBooking = (email: string,username: string,booking_num:string,booking_date:string,start_time:string,end_time:string,address:string,title:string,latitude:string,longitude:string,) => {
    let htmlcontent = template.replace('{username}', username)
    htmlcontent = htmlcontent.replace('{year}', new Date().getFullYear().toString())
    htmlcontent = htmlcontent.replace('{booking_num}',booking_num)
    htmlcontent = htmlcontent.replace('{booking_date}',booking_date)
    htmlcontent = htmlcontent.replace('{start_time}',start_time)
    htmlcontent = htmlcontent.replace('{end_time}',end_time)
    htmlcontent = htmlcontent.replace('{address}',address)
    htmlcontent = htmlcontent.replace('{title}',title)
    htmlcontent = htmlcontent.replace('{latitude}',latitude)
    htmlcontent = htmlcontent.replace('{longitude}',longitude)


    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank For Booking",
        html: htmlcontent
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Send Mail",err);
        }
        else {
            console.log(info);
        }

    });
}