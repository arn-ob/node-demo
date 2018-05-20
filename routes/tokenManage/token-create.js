let jwt = require('jsonwebtoken');
var log_data = require('../../log');

 // Create Token 
exports.TokernCreate = function (tokens, key) {
    log_data.logs("New Token Created");
    let token = jwt.sign(tokens, key, {
        expiresIn: 1 * 60
    });
    return token;

}