const db = require('./../db-config/db-select');
const format = require("node.date-time");
var log_data = require('../../log');

exports.get_ecg_sec_prev_value = function (id) { 


    var sql = "SELECT count(seq) as s FROM ecg_data WHERE UserID = '" + id + "'";


    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                log_data.logs("ecg-sec.js: Error : " + err);
                throw err;
            } else {    
                var res =  result[0].s;
                console.log(res);
               return res;
    
            }
        } catch (err) {
            // send log data
            log_data.logs("ecg-sec.js: store Error : " + err);
            console.log('ecg-sec.js: Problem inside server');
            console.log("ecg-sec.js: Request handled by exception");
        }
    });

}
