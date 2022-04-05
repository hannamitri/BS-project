const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.getProjectData = async (req, res) => {
  const { project_id } = req.body;

  let tableName = "DataCollected";
  let sql = `SELECT * FROM ${tableName} where Project_id =${project_id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};
