const db = require('./../db-config/db-select');
let tokenManage = require('./../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../log');

exports.finalize_Nurse = function (req, res) {

    log_data.logs("nurse-finalize.js: New doctor Signup request");

    var input = req.body;
    let BOD = input.day + "/" + input.month + "/" + input.year;
    let present_date = new Date().format("Y-M-d");
    let present_time = new Date().format("H:m:s");

    console.log(req.body);
    var sql1 = "UPDATE users SET first_name='" + input.first_name + "', last_name ='" + input.last_name + "' WHERE reg_id = '" + input.reg_id + "'";
    var sql2 = "INSERT INTO nurse(reg_id, registration_no, date_of_birth,  created_date, created_time) VALUES ('" + input.reg_id + "','" + input.reg + "','" + BOD + "','" + present_date + "','" + present_time + "')";

    var sql = sql1 + ";" + sql2;

    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("nurse-finalize.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("nurse-finalize.js: Signup successful");
                let token = tokenManage.TokernCreate({
                    token: input.reg_id
                }, 'secret');
                log_data.logs("nurse-finalize.js: Signup Token : " + token);

                res.json({
                    token: token,
                });
                console.log("nurse-finalize.js: inserted");

            }
        } catch (err) {
            log_data.logs("nurse-finalize.js: Signup Error : " + err);
            console.log('nurse-finalize.js: Problem inside server');
            console.log("nurse-finalize.js: Request handled by exception");
            res.json({
                token: null
            });
        }
    });


};