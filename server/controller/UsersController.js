const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");
const bcrypt = require("bcrypt");

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

exports.getUserByEmail = async (req, res) => {
  const { email } = req.body;

  let tableName = "Users";

  let sql = `SELECT user_id FROM ${tableName} where email="${email}"`;
  console.log(sql);
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.body;
  let sql = `delete from users WHERE user_id = "${id}"`;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.updateUser = (req, res) => {
  const {
    user_id,
    name,
    email,
    password,
    location,
    phone_number,
    isProfessional,
    isAdmin,
  } = req.body;

  let updateSql = `UPDATE Users set user_name = "${name}", password = "${password}", \
    location = "${location}", email = "${email}", phone_number ="${phone_number}", isProfessional ="${isProfessional}",isAdmin ="${isAdmin}"\
        WHERE user_id = ${user_id}`;

  console.log(updateSql);

  connection.query(updateSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.insertUser = async (req, res) => {
  const { Name, Email, Password, Location, isProfessional, pn, isAdmin } =
    req.body;

  const hashedPassword = await bcrypt.hash(Password, 10);

  let saveSql = `INSERT INTO Users(user_name, phone_number, isProfessional ,Location, email,Password,isAdmin) VALUES\
    ("${Name}","${pn}", "${isProfessional}", "${Location}", "${Email}", "${hashedPassword}", "${isAdmin}")`;
  console.log(saveSql);
  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
}

exports.setProfile = async (req, res) => {
  const { profile, user_id } = req.body;
  let saveSql = `UPDATE Users set profile="${profile}" WHERE user_id="${user_id}"`;
  console.log(saveSql);
  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
}

