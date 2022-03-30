const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require('../config/database.config.js');
const { OAuth2Client } = require('google-auth-library');
const { response } = require("express");
const client = new OAuth2Client('1092910563903-qv6jqr7okondoc736k2ivfr2to2e2bp4.apps.googleusercontent.com');

exports.googlelogin = async (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({
        idToken: tokenId, audience: "1092910563903-qv6jqr7okondoc736k2ivfr2to2e2bp4.apps.googleusercontent.com"
    }).then(response => {
        const { email_verified, name, email, location } = response.payload;
        console.log(response.payload)
        if (email_verified) {
            let tableName = "Users";
            let sql = `SELECT * FROM ${tableName} where email= "${email}"`;
            console.log(sql);

            connection.query(sql, function (err, results) {
                if (results.length > 0) {
                    console.log("User is found in database ")
                    if (err) throw err;
                    res.status(200).send(results)
                }
                else {
                    console.log("User is not found in database ")
                    let password = email + process.env.JWT_SIGNIN_KEY;
                    let saveSql = `INSERT INTO Users(Name, Password, Location, Email) VALUES\
                    ("${name}", "${password}", "${location}", "${email}")`;
                    connection.query(saveSql, (err, results) => {
                        if (err) throw err;
                        res.status(200).send(results)
                    })

                }
            })

        }
    })
}


