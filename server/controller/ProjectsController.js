const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.getAll = async (req, res) => {
  let tableName = "Projects";
  let sql = `SELECT * FROM ${tableName}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};

exports.insertProject = (req, res) => {
  const { category } = req.body;
  let saveSql = `INSERT INTO Projects(category) VALUES\
        ("${category}")`;

  console.log(saveSql);

  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.body;
  let sql = `delete from Projects WHERE project_id = ${id} `;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};
