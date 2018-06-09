// Get the list from db
var mysql = require('mysql');

// Local

module.exports.con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'new_health_ap_db',
    multipleStatements: true
});
 