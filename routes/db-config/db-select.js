var db = require('./db-config'); // For local 
var db_aws = require('./db-config-For-AWS'); // For AWS

module.exports.con = db_aws.con; //db_aws.con;
