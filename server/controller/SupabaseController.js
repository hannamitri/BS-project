const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.isHeAuth = (req, res) => {
  let tableName = "users";
  let body = req?.body;
  let email = body?.email;
  console.log(body);

  let saveSql = `SELECT * FROM ${tableName} WHERE email = "${email}"`;

  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
};
