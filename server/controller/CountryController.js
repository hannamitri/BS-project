
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require('../config/database.config.js');


exports.getCountry = async (req, res) => {

    let tableName = "Country";
    let sql = `SELECT * FROM ${tableName}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).send(result);
    })

}

exports.getCountrybyCategory = async (req, res) => {
    const { Category } = req.body
    let tableName = "Country";
    let sql = `SELECT * FROM ${tableName} where Category = "${Category}"`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).send(result);
    })

}



exports.deleteCountry = (req, res) => {
    const { id } = req.body
    let sql = `delete from Country WHERE id=${id}`;
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)

    })
}


exports.updateCountry = (req, res) => {

    const { id, Name, Category, Location, Description } = req.body;

    let saveSql = "";

    if (id && id !== '') {
        saveSql = `UPDATE Country set Name= "${Name}",Category= "${Category}",\
        Location = "${Location}",   Description   ="${Description}"\
        WHERE id = ${id}`;
    }
    else {
        saveSQL = `INSERT INTO Country (Name,Category,Location,Description) VALUES\
        ("${Name}", "${Category}", "${Location}", "${Description}" )`;
    }

    console.log(saveSql);

    connection.query(saveSQL, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)

    })

}