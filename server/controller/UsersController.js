const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.getAll = async (req, res) => {
  let tableName = "Users";
  let sql = `SELECT * FROM ${tableName}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};

exports.getUserById = async (req, res) => {

  const { user_id } = req.body;

  let tableName = "Users";

  let sql = `SELECT * FROM ${tableName} where user_id= "${user_id}"`;
  console.log(sql);
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.body;
  let sql = `delete from users WHERE user_id = ${id} `;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.updateUser = (req, res) => {
  const { id, Name, Email, Password, Location, pn, isProfessional } = req.body;

  let updateSql = `UPDATE Users set user_name = "${Name}", password = "${Password}", \
    Location = "${Location}", email = "${Email}, phone_number ="${pn}, isProfessional ="${isProfessional}""\
        WHERE user_id = ${id} `;

  console.log(updateSql);

  connection.query(updateSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.insertUser = (req, res) => {
  const { Name, Email, Password, Location, isProfessional, pn } = req.body;
  let saveSql = `INSERT INTO Users(user_name, phone_number, isProfessional ,Location, email,Password) VALUES\
    ("${Name}","${pn}", "${isProfessional}", "${Location}", "${Email}", "${Password}")`;
  console.log(saveSql);
  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
};
