const nodemailer = require("nodemailer");
const config = require("../config/mailer");

const send = (data) => {
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
        if(err){
            console.log(err);
        } else{
            return info.response;
        }
    })
}

module.exports = { send };

