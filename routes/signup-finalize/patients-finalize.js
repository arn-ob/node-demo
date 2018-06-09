const db = require('./../db-config/db-select');
let tokenManage = require('./../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../log');

exports.finalize_Patients = function (req, res) {

    log_data.logs("patients-finalize.js: New doctor Signup request");

    var input = req.body;
    let BOD = input.day + "/" + input.month + "/" + input.year;
    let present_date = new Date().format("Y-M-d");
    let present_time = new Date().format("H:m:s");

    console.log(req.body);
    var sql1 = "UPDATE users SET first_name='" + input.first_name + "', last_name ='" + input.last_name + "', middle_name ='" + input.middle_name + "' WHERE reg_id = '" + input.reg_id + "'";
    var sql2 = "INSERT INTO patients(reg_id, sex, address, home_phn, email, card_no, past_history, weight, current_med, allergies, date_of_birth,  created_date, created_time)";
    var sql2_values = "VALUES ('" + input.reg_id + "','" + input.sex + "','" + input.address + "','" + input.home_phn + "','" + input.email + "','" + input.card_no + "','" + input.past_history + "','" + input.weight + "','" + input.current_med + "','" + input.allergies + "','" + BOD + "','" + present_date + "','" + present_time + "')";

    var sql = sql1 + ";" + sql2 + " " + sql2_values;

    db.con.query(sql, function (err, result, fields) {

        
        try {
            if (err) {

                log_data.logs("patients-finalize.js: Error : " + err);

                throw err;

            } else {

                log_data.logs("patients-finalize.js: Signup successful");

                let token = tokenManage.TokernCreate({
                    token: input.reg_id,
                }, 'secret');

                log_data.logs("patients-finalize.js: Signup Token : " + token);

                // Data send to client
                res.json({
                    token: token,
                });

                console.log("patients-finalize.js: inserted");

            }
        } catch (err) {

            log_data.logs("patients-finalize.js: Signup Error : " + err);

            console.log('patients-finalize.js: Problem inside server');

            console.log("patients-finalize.js: Request handled by exception");

            // Data send to client
            res.json({
                token: null
            });

        }
    });
};