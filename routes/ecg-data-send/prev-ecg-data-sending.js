var db = require('../db-config/db-select');


// prev_ecg_data sending to the application to check the data system
// post Request
exports.prev_send_ecg = function (req, res) {

    var input = req.body;
    var sql = "SELECT data FROM prev_ecg_data WHERE id = '" + input.id + "'";
    
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