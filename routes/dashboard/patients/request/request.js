/*
-- This will server the request based on client side request.
-- Like doctor list,checkup list etc
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Get Request request for hospital
exports.send_hospital_list = function(req, res) {

    log_data.logs("Get request for Hospital Name Request");

    var sql = "select * from hospital";

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("request.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("request.js: Sending Hospital List");

                // Send data to client
                res.json({
                    result
                });
                console.log("request.js: Sended");

            }
        } catch (err) {
            log_data.logs("request.js: There Might Be get Error : " + err);
            console.log('request.js: Problem inside server');
            console.log("request.js: Request handled by exception");
            
            res.json({
                token: null
            });

            log_data.logs("request.js: Null sended");
        }
    });
};



// For Get Request request for doctor name
exports.send_doctor_list = function(req, res) {

    log_data.logs("Get request for Doctor List Request");

    var sql = "SELECT users.reg_id as req_id, users.first_name as firstname, users.last_name as lastname FROM users,doctor WHERE users.reg_id=doctor.reg_id ";

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("request.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("request.js: Sending Doctor List");

                // Send data to client
                res.json({
                    result
                });
                console.log("request.js: Sended");

            }
        } catch (err) {
            log_data.logs("request.js: There Might Be get Error : " + err);
            console.log('request.js: Problem inside server');
            console.log("request.js: Request handled by exception");
            
            res.json({
                token: null
            });

            log_data.logs("request.js: Null sended");
        }
    });
};




// For Get Request request for doctor name
exports.send_nurse_list = function(req, res) {

    log_data.logs("Get request for Nurse list Request");

    var sql = "SELECT users.reg_id as req_id, users.first_name as firstname, users.last_name as lastname FROM users,nurse WHERE users.reg_id=nurse.reg_id ";

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("request.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("request.js: Sending Nurse List");

                // Send data to client
                res.json({
                    result
                });
                console.log("request.js: Sended");

            }
        } catch (err) {

            log_data.logs("request.js: There Might Be get Error : " + err);
            console.log('request.js: Problem inside server');
            console.log("request.js: Request handled by exception");
            
            res.json({
                token: null
            });

            log_data.logs("request.js: Null sended");
        }
    });
};

