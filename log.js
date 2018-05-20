var fs = require('fs');
const format = require("node.date-time");
var writeSource = "log.txt";


exports.logs = function (data) {
    
    let present_date = new Date().format("Y-M-d");
    let present_time = new Date().format("H:m:s");
    log = "###  " + present_date + "__" + present_time + " :" + " " + data + "\n" ;
   
    fs.appendFile(writeSource, log, function (err) {
        if (err) {
            throw err;
        }
        
    });

}