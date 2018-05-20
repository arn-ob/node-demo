const db = require('./../db-config/db-select');
const format = require("node.date-time");
let tokenManage = require('./../tokenManage/token-create');
let randomID = require('random-id');
let emailSend = require('./../email-varification/email-verification');
var log_data = require('../../log');

exports.insert_nurse = function (req, res) {
    
    log_data.logs("nurse-signup.js: New nurse Signup request");

    var input = req.body;

    // Random ID generator
    let random_id = randomID(20, "A11");
    let signup_validity = randomID(5, "A11");

    let present_date = new Date().format("Y-M-d");
    let present_time = new Date().format("H:m:s");

    var sql1 = "INSERT INTO users (reg_id,email,password,signup_validity,created_date,created_time) VALUES ('" + random_id + "','" + input.email + "','" + input.password + "','" + signup_validity + "','" + present_date + "','" + present_time + "')"
    var sql2 = "INSERT INTO role (reg_id,is_admin,is_doctor,is_nurse,is_patients,created_date) VALUES ('" + random_id + "','false','false','" + input.isnurse + "','false','" + present_date + "')";
    var sql3 = "INSERT INTO address (reg_id) VALUES ('" + random_id + "')";

    var sql = sql1 + ";" + sql2 + ";" + sql3;

    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("nurse-signup.jsError : " + err);
                throw err;
            } else {
                // send log data
                log_data.logs("nurse-signup.js: Signup successful");
                
                let email_send_status = emailSend.sendMail(input.email, signup_validity, 'Nurse');

                let token = tokenManage.TokernCreate({
                    email: input.email,
                    reg_id: random_id,
                    sucess: true,
                    signup_id: signup_validity,
                    emailSend: email_send_status
                }, 'secret');

                log_data.logs("nurse-signup.js: Signup Token : " + token);

                res.json({
                    token: token
                });
            }
        } catch (err) {
            log_data.logs("nurse-signup.js: Signup Error : " + err);

            console.log('nurse-signup.js: Problem inside server');
            console.log("nurse-signup.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });

};