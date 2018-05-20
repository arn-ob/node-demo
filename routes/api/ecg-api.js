const db = require('./../db-config/db-select');
const format = require("node.date-time");
var log_data = require('../../log');
var ecg_sec = require('./ecg-sec')




exports.insert_ecg_data =  function (req, res) {

    log_data.logs("ecg-api.js: API Request");


    var present_date = new Date().format("Y-M-d");

    // Query input
    var input = req.body;
    // const last_ecg_sec = ecg_sec.get_ecg_sec_prev_value(input.UserID); AHW21RBAYKY71N3

    var sql = "INSERT INTO ecg_data (checkup_id, seq, data, createdDate) VALUES ('" + input.checkup_id + "','" + input.seq + "','" + input.data + "','" + present_date + "')";


    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                
                log_data.logs("ecg-api.js: Error : " + err);
                
                throw err;
           
            } else {    
                // send log data
                log_data.logs("ecg-api.js: Signup successful");

                
                // Send to client
                res.json({
                    stored: true
                });
                
                console.log("ecg-api.js: inserted");
                
            }
        } catch (err) {
            // send log data
            log_data.logs("ecg-api.js: store Error : " + err);

            console.log('ecg-api.js: Problem inside server');
            
            console.log("ecg-api.js: Request handled by exception");
            
            // send to client
            res.json({
                stored: false
            });
        }
    });
};