/*
-- This will send the checkup details. For the patients
--
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Post request
exports.send_patients_details = function (req, res) {

    log_data.logs("Get request for Patients Details");
    var input = req.body;

    var sql = "SELECT users.first_name,users.last_name,admissions.doctor_id,admissions.hospitals_id,admissions.other,admissions.status,patients.date_of_birth,patients.blood_group FROM users,admissions,patients where admissions.admission_id='" + input.reg_id + "' and admissions.patients_id=users.reg_id and users.reg_id=patients.reg_id "

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("patients_details.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("patients_details.js: Patints Details Found");
                var token;

                log_data.logs("patients_details.js: Patients Detials Sending ");

                // Send data to client
                res.json({
                    result
                });
                console.log("patients_details.js: Send");

            }
        } catch (err) {
            log_data.logs("patients_details.js: Existing ID Signup Error : " + err);
            console.log('patients_details.js: Problem inside server');
            console.log("patients_details.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });
};
