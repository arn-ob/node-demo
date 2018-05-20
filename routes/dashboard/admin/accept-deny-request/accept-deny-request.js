/*
-- This will store the admission Request from the client side request
*/

const db = require('./../../../db-config/db-select');
let tokenManage = require('./../../../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../../../log');



exports.new_request_accept = function(req, res) {
    log_data.logs("Get request for New Admission");


    // Query input
    var input = req.body;
    console.log(input);
    var sql = "UPDATE " + input.where + " SET status='accept' WHERE reg_id = '" + input.reg_id + "'";

    console.log(sql);
    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("accept-accept-request.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("accept-accept-request.js: Sending Hospital List");

                // Send data to client
                res.json({
                    success : "true"
                });
                console.log("accept-accept-request.js: Storeds");

            }
            
        } catch (err) {
            log_data.logs("accept-accept-request.js: There Might Be get Error : " + err);
            console.log('accept-accept-request.js: Problem inside server');
            console.log("accept-accept-request.js: Request handled by exception");
            
            res.json({
                token: null
            });

            log_data.logs("accept-accept-request.js: Null sended");
        }
    });
};

exports.new_request_deny = function(req, res) {
    log_data.logs("Get request for New Admission");

    // Query input
    var input = req.body;

    var sql = "UPDATE " + input.where + " SET status='deny' WHERE reg_id = '" + input.reg_id + "'"; 

    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("accept-deny-request.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("accept-deny-request.js: Sending Hospital List");

                // Send data to client
                res.json({
                    success : "true"
                });
                console.log("accept-deny-request.js: Storeds");

            }
            
        } catch (err) {
            log_data.logs("accept-deny-request.js: There Might Be get Error : " + err);
            console.log('accept-deny-request.js: Problem inside server');
            console.log("accept-deny-request.js: Request handled by exception");
            
            res.json({
                token: null
            });

            log_data.logs("accept-deny-request.js: Null sended");
        }
    });
};

