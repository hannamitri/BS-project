const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require("../config/database.config.js");

exports.getDataCollected = async (req, res) => {
  let tableName = "DataCollected";
  let sql = `SELECT * FROM ${tableName}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.status(200).send(result);
  });
};

exports.deleteDataCollected = (req, res) => {
  const { data_id } = req.body;
  let sql = `delete from DataCollected WHERE data_id=${data_id}`;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.updateDataCollected = (req, res) => {
  const {
    data_id,
    description,
    location_collected,
    time_collected,
    date_collected,
    image,
  } = req.body;

  if (data_id && data_id !== "") {
    let saveSql = `UPDATE  DataCollected set description= "${description}", location_collected= "${location_collected}",\
            time_collected = "${time_collected}",  date_collected  ="${date_collected} , image="${image}"\
            WHERE data_id = ${data_id}`;
  }
  console.log(saveSql);

  connection.query(saveSQL, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};

exports.insertDataCollected = (req, res) => {
  const {
    description,
    location_collected,
    time_collected,
    date_collected,
    image,
    project_id,
    user_id,
  } = req.body;
  let saveSql = `INSERT INTO datacollected(description, location_collected, time_collected ,date_collected, image, project_id, user_id) VALUES\
    ("${description}","${location_collected}", "${time_collected}", "${date_collected}", "${image}", "${project_id}" , "${user_id}")`;

  console.log(saveSql);

  connection.query(saveSql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};


exports.getDataBetweenDates = (req, res) => {
  const { startDate, endDate } = req.body;
  let sql = `SELECT * from datacollected where(date_collected BETWEEN '${startDate}' AND '${endDate}')`;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
};
