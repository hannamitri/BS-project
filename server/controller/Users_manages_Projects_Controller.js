const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.get_Users_Projects = async (req, res) => {
  let tableName = "Users_manages_Projects";
  let sql = `SELECT * FROM ${tableName}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};

exports.insert_Users_Projects = (req, res) => {
  const { user_id, project_id } = req.body;
  let saveSql = `INSERT INTO Users_manages_Projects(user_id,project_id) VALUES\
    ("${user_id}","${project_id}")`;
  console.log(saveSql);
  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.getUsersbyProject = (req, res) => {
  const { project_id } = req.body;
  let sql = `Select * from users where user_id in 
      (Select user_id from users_manages_projects where project_id = "${project_id}")`;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};
