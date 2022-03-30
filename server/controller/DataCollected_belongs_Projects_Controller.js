
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require('../config/database.config.js');


exports.getDataCollected_of_Project = async (req, res) => {

    let tableName = "DataCollected_belongs_Projects";
    let sql = `SELECT * FROM ${tableName}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).send(result);
    })

}



exports.insertDataCollected_Project = (req, res) => {
    const { project_id, data_id } = req.body;
    let saveSql = `INSERT INTO DataCollected_belongs_Projects(project_id,data_id) VALUES\
    ("${project_id}","${data_id}"")`;
    console.log(saveSql);
    connection.query(saveSql, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)

    })

}

