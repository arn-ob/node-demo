// Get the list from db
const mysql = require('mysql2');

// Online (Azure only)

exports.con = mysql.createConnection({
    host: 'mysql.mdkamrul.com',
    user: 'selim',
    password: 'S3l1m123',
    port: 3306,
    database: 'rhcapi',
    multipleStatements: true,
    connectTimeout:20000
});

