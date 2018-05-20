const db = require('./db-config/db-select'); // Local  
//const db = require('./db-config-For-Azure'); // For Azure
let jwt = require('jsonwebtoken');

exports.Getsearch = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT name FROM customer', function (err, result) {

            if (err)
                console.log("Error Selecting : %s ", err);

            //res.render('customers',{page_title:"Customers - Node.js",data:rows});
            console.log(result);
            res.json(result);

        });

    });

};


// Edit data
exports.edit = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM customer WHERE id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            //res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});


        });


    });
};


// Save data to db Doctor
exports.insert_Doctor = function (req, res) {


    var input = req.body;

    console.log(input);
    var sql = "INSERT INTO doctor (name,pass,email) VALUES ('" + input.username + "','" + input.password + "','" + input.email + "')";

    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                throw err;
            } else {
                let token = TokernCreate({
                    username: input.username,
                    sucess: true
                }, 'secret');

                //res.sendStatus(200);
                res.json({
                    token: token,
                });
                console.log("inserted");
                res.sendStatus(200);
            }
        } catch (err) {
            console.log('Problem inside server');
            console.log("Request handled by exception");
            res.sendStatus(500);
        }
    });


};


// Save data to db for Nurse
exports.insert_nurse = function (req, res) {


    var input = req.body;

    console.log(input);
    var sql = "INSERT INTO nurse (name,pass,email) VALUES ('" + input.username + "','" + input.password + "','" + input.email + "')";

    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                throw err;
            } else {

                console.log("inserted");
                res.sendStatus(200);
            }
        } catch (err) {
            console.log('Problem inside server');
            console.log("Request handled by exception");
            res.sendStatus(500);
        }
    });

};


// Save data to db patient
exports.insert_patient = function (req, res) {


    var input = req.body;

    console.log(input);
    var sql = "INSERT INTO patient (name,pass,email) VALUES ('" + input.username + "','" + input.password + "','" + input.email + "')";

    db.con.query(sql, function (err, result, fields) {

        try {
            if (err) {
                throw err;
            } else {

                console.log("inserted");
                res.sendStatus(200);
            }
        } catch (err) {
            console.log('Problem inside server');
            console.log("Request handled by exception");
            res.sendStatus(500);
        }
    });
};


// Update data
exports.update = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };

        connection.query("UPDATE customer set ? WHERE id = ? ", [data, id], function (err, rows) {

            if (err)
                console.log("Error Updating : %s ", err);



        });
    });
};


// Delete User
exports.delete = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM customer  WHERE id = ? ", [id], function (err, rows) {

            if (err)
                console.log("Error deleting : %s ", err);



        });

    });
};


// Create Token 
TokernCreate = function (tokens, key) {
    let token = jwt.sign(tokens, key, {
        expiresIn: 1 * 60
    });
    return token;

}