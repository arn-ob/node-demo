/*
-- This will send the checkup details. For the patients
--
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Post request
exports.update_doctor_info= function (req, res) {

    log_data.logs("Update request for Doctor Information");
    var input = req.body;

    var sql1 = "UPDATE users SET first_name='"+input.first_name +"' ,last_name='"+input.last_name +"' ,user_name='"+input.user_name +"' WHERE reg_id =  '"+ input.reg_id+"'";
    var sql2 = "UPDATE doctor SET registration_no='"+input.req_no +"',date_of_birth='"+input.date_of_birth +"',other_text='"+input.other_text +"' WHERE reg_id='"+ input.reg_id+"'";
    
    var sql = sql1 + ";" +sql2;

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("update_doctor_info.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("update_doctor_info.js: Patints Details Found");
                var token;

                log_data.logs("update_doctor_info.js: Patients Detials Sending ");

                // Send data to client
                res.json({
                    result: "success"
                });
                console.log("update_doctor_info.js: Send");

            }
        } catch (err) {
            log_data.logs("update_doctor_info.js: Existing ID Signup Error : " + err);
            console.log('update_doctor_info.js: Problem inside server');
            console.log("update_doctor_info.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });
};
