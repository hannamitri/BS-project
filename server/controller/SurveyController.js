
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require('../config/database.config.js');

exports.getAll = async (req, res) => {
    let tableName = "survey";
    let sql = `SELECT * FROM ${tableName}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).send(result);
    })

}

exports.insertResults = (req, res) => {

    const { tableName, option, username, country } = req.body;

    let saveSql = `INSERT INTO ${tableName}(option,username,country) VALUES\
        ("${option}", "${username}", "${country}")`;

    console.log(saveSql);

    connection.query(saveSql, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)

    })

}

exports.fetchOptions = (req, res) => {
    const { tableName, id, visitLebanon } = req.body;
    let sql = `select ${id} as id, ${visitLebanon} as visitLebanon from ${tableName}`;
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) throw err
        res.status(200).send(result);
    })
}
