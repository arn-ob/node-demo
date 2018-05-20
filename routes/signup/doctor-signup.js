const db = require('./../db-config/db-select');
const format = require("node.date-time");
let tokenManage = require('./../tokenManage/token-create');
let randomID = require('random-id');
let emailSend = require('./../email-varification/email-verification');
var log_data = require('../../log');

exports.insert_Doctor = function (req, res) {

    log_data.logs("doctor-signup.js: New doctor Signup request");

    // Random ID generator
    let random_id = randomID(20,"A11");
    let signup_validity = randomID(5,"A11");

    let present_date = new Date().format("Y-M-d");
    let present_time = new Date().format("H:m:s");

    // Query input
    var input = req.body;

    
    var sql1 = "INSERT INTO users (reg_id,email,password,signup_validity,created_date,created_time) VALUES ('" + random_id + "','" + input.email + "','" + input.password + "','" + signup_validity + "','" + present_date + "','" + present_time + "')"
    var sql2 = "INSERT INTO role (reg_id,is_admin,is_doctor,is_nurse,is_patients,created_date) VALUES ('" + random_id + "','false','" + input.isdoctor + "','false','false','" + present_date + "')";
    var sql3 = "INSERT INTO address (reg_id) VALUES ('" + random_id + "')";
    
    var sql = sql1 + ";" + sql2 + ";" + sql3;
     
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                
                log_data.logs("doctor-signup.js: Error : " + err);
                
                throw err;
           
            } else {    
                // send log data
                log_data.logs("doctor-signup.js: Signup successful");
                
                let email_send_status = emailSend.sendMail(input.email,signup_validity,'Doctor');
                
                let token = tokenManage.TokernCreate({
                    email: input.email,
                    reg_id: random_id,
                    sucess: true,
                    signup_id: signup_validity,
                    emailSend: email_send_status
                }, 'secret');
                
                // send log data
                log_data.logs("doctor-signup.js: Signup Token : " + token);
                
                // Send to client
                res.json({
                    token: token
                });
                
                console.log("doctor-signup.js: inserted");
                
            }
        } catch (err) {
            // send log data
            log_data.logs("doctor-signup.js: Signup Error : " + err);

            console.log('doctor-signup.js: Problem inside server');
            
            console.log("doctor-signup.js: Request handled by exception");
            
            // send to client
            res.json({
                token: null
            });
        }
    });
};