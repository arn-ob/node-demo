/*
-- This 
--
*/
const db = require('./../db-config/db-select');
let tokenManage = require('./../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../log');

exports.existing_doctor_nurse_entry = function (req, res) {

    log_data.logs("New doctor Role requested");

    var input = req.body;
    let BOD = input.day + "/" + input.month + "/" + input.year;
    let present_date = new Date().format("Y-M-d");
    let present_time = new Date().format("H:m:s");

    console.log(input);
    
    // SQL script
    var sql1 = "UPDATE users SET first_name='" + input.first_name + "', last_name ='" + input.last_name + "' WHERE reg_id = '" + input.reg_id + "'";
    var sql2 = "INSERT INTO " + input.role + " (reg_id, registration_no, date_of_birth,  created_date, created_time) VALUES ('" + input.reg_id + "','" + input.reg + "','" + BOD + "','" + present_date + "','" + present_time + "')";
    
    if (input.role === "doctor") {
        var sql3 = "UPDATE role SET is_doctor='true' WHERE reg_id = '" + input.reg_id + "'";

    }
    if (input.role === 'nurse') {
        var sql3 = "UPDATE role SET is_nurse = 'true' WHERE reg_id = '" + input.reg_id + "'";
    }
    
    // Adding script into one
    var sql = sql1 + ";" + sql2 + ";" + sql3;
    
    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("existing-doctor-nurse.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("existing-doctor-nurse.js: Existing user,New role added successful");
                let token = tokenManage.TokernCreate({
                    token: input.reg_id
                }, 'secret');
                
                log_data.logs("existing-doctor-nurse.js: Added new user role(Existing ID) Token : " + token);

                // Send data to client
                res.json({
                    token: token,
                });
                console.log("existing-doctor-nurse.js: inserted");

            }
        } catch (err) {
            log_data.logs("existing-doctor-nurse.js: Existing ID Signup Error : " + err);
            console.log('existing-doctor-nurse.js: Problem inside server');
            console.log("existing-doctor-nurse.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });


};