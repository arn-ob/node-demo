var db = require('../db-config/db-select');

// post Request
exports.send_ecg = function (req, res) {

    var input = req.body;
    // var sql = "SELECT data FROM ecg_data WHERE checkup_id = '" + input.checkup_id + "' and seq = '" + input.seq + "' ";
    
    var sql = "SELECT ecg_data FROM combined_data WHERE admissionID = '100' and id = '" + input.seq + "' and YEAR(date) = YEAR(CURDATE())";
    // SQL script execution
    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {

                throw err;
            } else {

                // Send data to client
                res.json({
                    result
                });
                
                console.log("Ecg Data: Send");

            }
        } catch (err) {

            console.log('Ecg Data: Problem inside server');
            console.log("Ecg Data: Request handled by exception");
            res.json({
                token: null
            });
        }
    });
};