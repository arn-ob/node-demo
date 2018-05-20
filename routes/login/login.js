const db = require('./../db-config/db-select');
let jwt = require('jsonwebtoken');
var log_data = require('../../log');


exports.in = function (req, res) {

    var input = req.body;

    var sql = "SELECT * FROM users,role WHERE users.email ='" + input.email + "' AND users.password ='" + input.password + "' and users.reg_id = role.reg_id";
    
    try {
       
        db.con.query(sql, function (err, result, fields) {

            try {
                if (err) {
                    log_data.logs(err);
                    throw err;
                } else {
                    
                    // console.log(result[0]);
                    let token = TokernCreate({token: result[0]}, 'secret');
                    
                    // Log it to log file
                    log_data.logs("reg_id Request : " + result[0].reg_id);
                    log_data.logs("login in Successful");
                    log_data.logs("Sended Token : " + token);
                    
                    // Data send to client browser
                    res.json({
                        token: token
                    });
                }
            } catch (err) {
                console.log('Login.js: Login Failed');
                log_data.logs("Login Failed");
                log_data.logs("Failed Error : " + err);
                // console.log("Request handled by exception");
                // For failed to login. Or Wrong username or password input
                res.json({
                    token: null
                });
            }
        });
    } catch (exception) {
        console.log(exception);
    }
};


// Create Token 
TokernCreate = function (tokens, key) {
    let token = jwt.sign(tokens, key,{ expiresIn: 1*60 });
    return token;

}

// Decode token
TokernDecod = function (token) {
    let decoded = jwt.decode(token, {
        complete: true
    });
    return decoded;
}