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
  const { category, name, image, date_created } = req.body;
  let saveSql = `INSERT INTO Projects(category,name,date_created,image) VALUES\
        ("${category}","${name}","${date_created}","${image}")`;
  console.log(saveSql);
  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};


exports.updateProject = (req, res) => {
  const { category, name, image, date_created, project_id } = req.body;
  let saveSql = `Update Projects set category="${category}",name="${name}",date_created="${date_created}",image="${image}" where project_id="${project_id}"`;
  console.log(saveSql);
  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};


exports.getProjectId = (req, res) => {

  const { name } = req.body;

  let saveSql = `Select project_id from projects where name = "${name}"; `;

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


