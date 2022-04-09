const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.getDataCollectedbyUsers = async (req, res) => {
  let tableName = "DataCollected";
  const { user_id } = req.body;
  let sql = `SELECT * FROM ${tableName} where user_id="${user_id}"`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};


