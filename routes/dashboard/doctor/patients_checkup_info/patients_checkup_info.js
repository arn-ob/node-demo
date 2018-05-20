/*
-- This will send the selected checkup details based on Checkup IO
--
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Post request
exports.send_patients_checkup_info = function (req, res) {

    log_data.logs("Get request for Patients checkup Details");
    var input = req.body;

    var sql = "SELECT * FROM checkups,ecg_data where checkups.checkup_id='" + input.reg_id + "' and checkups.checkup_id = ecg_data.checkup_id";

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("patients_checkup_info.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("patients_checkup_info.js: Patints Details Found");
                var token;

                log_data.logs("patients_checkup_info.js: Patients Detials Sending ");

                // Send data to client
                res.json({
                    result
                });
                console.log("patients_checkup_info.js: Send");

            }
        } catch (err) {
            log_data.logs("patients_checkup_info.js: Existing ID Signup Error : " + err);
            console.log('patients_checkup_info.js: Problem inside server');
            console.log("patients_checkup_info.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });
};
