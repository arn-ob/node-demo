/*
-- This will send the checkup details. For the patients
--
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Post request
exports.checkup_details = function (req, res) {

    log_data.logs("Get request for checkup details");
    var input = req.body;

    var sql = "select * from admissions WHERE patients_id = '" + input.reg_id + "'";


    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("checkup-details.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("checkup-details.js: Existing user,New role added successful");
                var token;

                log_data.logs("checkup-details.js: Added new user role(Existing ID) Token : ");

                // Send data to client
                res.json({
                    result
                });
                console.log("checkup-details.js: Send");

            }
        } catch (err) {
            log_data.logs("checkup-details.js: Existing ID Signup Error : " + err);
            console.log('checkup-details.js: Problem inside server');
            console.log("checkup-details.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });
};


// For Get request [This will not needed]
exports.send_request_patients_data = function(req, res){

    var sql = "select * from users"; 

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("existing-doctor-nurse.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("existing-doctor-nurse.js: Existing user,New role added successful");
                let token = tokenManage.TokernCreate({
                    token: result[0]
                }, 'secret');

                log_data.logs("existing-doctor-nurse.js: Added new user role(Existing ID) Token : " + token);

                // Send data to client
                res.json({
                    result
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

}