/*
-- This will send the checkup details. For the patients
--
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Post request
exports.send_patients_list = function (req, res) {

    log_data.logs("Get request for Patients Details");
    var input = req.body;

    var sql = "SELECT DISTINCT users.first_name as firstName, users.last_name as lastName,admissions.admission_id,users.email,admissions.createdDate FROM admissions,doctor,patients,users WHERE admissions.doctor_id = '" + input.reg_id + "' and admissions.patients_id = patients.reg_id and patients.reg_id = users.reg_id";


    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("patients_list.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("patients_list.js: Patints Details Found");
                var token;

                log_data.logs("patients_list.js: Patients Detials Sending ");

                // Send data to client
                res.json({
                    result
                });
                console.log("patients_list.js: Send");

            }
        } catch (err) {
            log_data.logs("patients_list.js: Existing ID Signup Error : " + err);
            console.log('patients_list.js: Problem inside server');
            console.log("patients_list.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });
};
