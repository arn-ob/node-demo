/*
-- This will server the request based on client side request.
-- Like doctor list,checkup list etc
*/
const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');


// For Get Request request for hospital
exports.send_requested_patients_list = function(req, res) {

    log_data.logs("Get request for Doctor List");

    var sql = "SELECT * FROM patients,users WHERE users.reg_id = patients.reg_id and patients.status = 'requested' ";

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("get-request_patients_list.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("get-request_patients_list.js: Sending Hospital List");

                // Send data to client
                res.json({
                    result
                });
                console.log("get-request_patients_list.js: Sended");

            }
        } catch (err) {
            log_data.logs("get-request_patients_list.js: There Might Be get Error : " + err);
            console.log('get-request_patients_list.js: Problem inside server');
            console.log("get-request_patients_list.js: Request handled by exception");
            
            res.json({
                token: null
            });

            log_data.logs("get-request_patients_list.js: Null sended");
        }
    });
};
