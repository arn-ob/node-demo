/*
-- This will store the admission Request from the client side request
*/

const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');
let randomID = require('random-id');

// For Get Request request for hospital
exports.new_checkup_request = function(req, res) {


    log_data.logs("Get request for Checkup Request");

    let checkups_id = randomID(15, "A11");
    
    let present_date = new Date().format("Y-M-d");
    let present_time = new Date().format("H:m:s");

    // Query input
    var input = req.body;

    var q1 = "INSERT INTO checkups (admission_id, checkup_id, checkup_type, CreatedDate)"; 
    var q2 = "VALUES ('" + input.admissionId + "', '" + checkups_id + "','" + input.checkupName + "' ,'" + present_date + "');";

    var sql = q1 + " " + q2;

    console.log(input);
    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("checkup_request.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("checkup_request.js: Sending Hospital List");

                // Send data to client
                res.json({
                    result
                });
                console.log("checkup_request.js: Stored");

            }
            
        } catch (err) {
            log_data.logs("checkup_request.js: There Might Be get Error : " + err);
            console.log('checkup_request.js: Problem inside server');
            console.log("checkup_request.js: Request handled by exception");
            
            res.json({
                token: null
            });
            
            log_data.logs("checkup_request.js: Null sended");
        }
    });
};

