/*
-- This will send the checkup details. For the patients
--
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Post request
exports.send_patients_checkup_details = function (req, res) {

    log_data.logs("Get request for Patients checkup Details");
    var input = req.body;

    var sql = "SELECT checkups.checkup_id, admissions.hospitals_id, checkups.checkup_type FROM admissions,checkups where admissions.admission_id='" + input.reg_id + "' and admissions.admission_id = checkups.admission_id";

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("patients_checkup_details.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("patients_checkup_details.js: Patints Details Found");
                var token;

                log_data.logs("patients_checkup_details.js: Patients Detials Sending ");

                // Send data to client
                res.json({
                    result
                });
                console.log("patients_checkup_details.js: Send");

            }
        } catch (err) {
            log_data.logs("patients_checkup_details.js: Existing ID Signup Error : " + err);
            console.log('patients_checkup_details.js: Problem inside server');
            console.log("patients_checkup_details.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });
};
