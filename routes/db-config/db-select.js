const db = require('./db-config'); // For local 
const db_aws = require('./db-config-For-AWS'); // For AWS

exports.con = db_aws.con;