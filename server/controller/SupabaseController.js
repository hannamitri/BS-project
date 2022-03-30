const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.isHeAuth = (req, res) => {
  let tableName = "users";
  let body = req?.body;
  let email = body[0]?.email;
  console.log(body);

  let saveSql = `SELECT 1 FROM ${tableName} WHERE email="barry@gmail.com"`;

  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};
