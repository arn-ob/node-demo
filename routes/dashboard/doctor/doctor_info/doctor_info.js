/*
-- This will send the checkup details. For the patients
--
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Post request
exports.send_doctor_info= function (req, res) {

    log_data.logs("Get request for Doctor Information");
    var input = req.body;

    var sql = "SELECT * FROM users,doctor WHERE users.reg_id = '"+input.reg_id+"' and users.reg_id = doctor.reg_id ";

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("doctor_info.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("doctor_info.js: Patints Details Found");
                var token;

                log_data.logs("doctor_info.js: Patients Detials Sending ");

                // Send data to client
                res.json({
                    result
                });
                console.log("doctor_info.js: Send");

            }
        } catch (err) {
            log_data.logs("doctor_info.js: Existing ID Signup Error : " + err);
            console.log('doctor_info.js: Problem inside server');
            console.log("doctor_info.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });
};
