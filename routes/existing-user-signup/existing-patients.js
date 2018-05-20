const db = require('./../db-config/db-select');
let tokenManage = require('./../tokenManage/token-create');
const format = require("node.date-time");
var log_data = require('../../log');

exports.existing_patients_entry = function (req, res) {

    log_data.logs("New patients Role requested");

    var input = req.body;
    let BOD = input.day + "/" + input.month + "/" + input.year;
    let present_date = new Date().format("Y-M-d");
    let present_time = new Date().format("H:m:s");

    // console.log(input.reg_id);
    
    // SQL script
    var sql1 = "UPDATE users SET first_name='" + input.first_name + "', last_name ='" + input.last_name + "' WHERE reg_id = '" + input.reg_id + "'";
    var sql2 = "INSERT INTO patients (reg_id, date_of_birth,  created_date, created_time) VALUES ('" + input.reg_id + "','" + BOD + "','" + present_date + "','" + present_time + "')";
    
    var sql3 = "UPDATE role SET is_patients ='true' WHERE reg_id = '" + input.reg_id + "'";
    
    var sql = sql1 + ";" + sql2 + ";" + sql3;
    console.log(sql);
    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("existing-patients.js: Error : " + err);
                throw err;
            } else {
                log_data.logs("existing-patients.js: Existing user,New role patients added successful");
                let token = tokenManage.TokernCreate({
                    token: input.reg_id,
                }, 'secret');
                
                log_data.logs("existing-patients.js: Added new user role patients(Existing ID) Token : " + token);

                // Data send to client
                res.json({
                    token: token,
                });
                console.log("existing-patients.js: inserted");

            }
        } catch (err) {
            log_data.logs("existing-patients.js: Existing ID patients Signup Error : " + err);
            console.log('existing-patients.js: Problem inside server');
            console.log("existing-patients.js: Request handled by exception");
            // Data send to server
            res.json({
                token: null
            });
        }
    });


};