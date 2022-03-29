const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.getDataCollected = async (req, res) => {
  let tableName = "datacollected";
  let sql = `SELECT * FROM ${tableName}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};

// exports.getUserByName = async (req, res) => {
//   const { email } = req.body;

//   let tableName = "Users";

//   let sql = `SELECT * FROM ${tableName} where email= "${email}"`;
//   console.log(sql);
//   connection.query(sql, (error, result) => {
//     if (error) throw error;
//     res.status(200).send(result);
//   });
// };

// exports.deleteUser = (req, res) => {
//   const { id } = req.body;
//   let sql = `delete from users WHERE user_id = ${id} `;
//   console.log(sql);
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).send(result);
//   });
// };

// exports.updateUser = (req, res) => {
//   const { id, Name, Email, Password, Location, pn, isProfessional } = req.body;

//   let updateSql = `UPDATE Users set user_name = "${Name}", password = "${Password}", \
//     Location = "${Location}", email = "${Email}, phone_number ="${pn}, isProfessional ="${isProfessional}""\
//         WHERE user_id = ${id} `;

//   console.log(updateSql);

//   connection.query(updateSql, (err, result) => {
//     if (err) throw err;
//     res.status(200).send(result);
//   });
// };

exports.insertDataCollected = (req, res) => {
  const {
    description,
    location_collected,
    time_collected,
    date_collected,
    image,
  } = req.body;
  let saveSql = `INSERT INTO datacollected(description, location_collected, time_collected ,date_collected, image) VALUES\
    ("${description}","${location_collected}", "${time_collected}", "${date_collected}", "${image}")`;
  console.log(saveSql);
  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};
