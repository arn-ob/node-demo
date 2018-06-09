var nodemailer = require('nodemailer');
var log_data = require('../../log');

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'healthapp9@gmail.com',
        pass: '01746110246'
    } // Auth of the access email username and password
});


exports.sendMail = function (EmailAddress, regID, regType) {
    log_data.logs("email-verification.js: Email Sending");

    try {
        mailOptions = {
            from: '"Registration Confirmation" <healthapp9@gmail.com>',
            to: EmailAddress,
            subject: "Please confirm your Email account for Health App",
            html: "Thnak you for registration as a " + regType + ". Your Reg ID is '" + regID + "'"
        }

        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                log_data.logs("email-verification.js: Error : " + error);
                return "error";
            } else {
                log_data.logs("email-verification.js: Email Send");
                console.log("email-verification.js: Message sent");
                return "send";
            }
        });
        
    } catch (e) {
        console.log('email-verification.js: Problem Sending Mail');
        log_data.logs("email-verification.js: Email is not send, The email address might me problem. Check the Email address");
    }
}