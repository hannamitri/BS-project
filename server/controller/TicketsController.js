
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
var moment = require("moment-timezone");

// MYSQL DATABASE CONNECTION
const connection = require('../config/database.config.js');


exports.getTickets = async (req, res) => {
    let tableName = "Tickets";
    let sql = `SELECT * FROM ${tableName}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).send(result);
    })

}


exports.deleteTicket = (req, res) => {
    const { TicketNo } = req.body
    let sql = `delete from Tickets WHERE TicketNo=${TicketNo}`;
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)

    })
}


exports.updateTicket = (req, res) => {

    const { TicketNo, Time, Destination, Departure, Price } = req.body;

    let saveSql = "";

    if (id && id !== '') {
        saveSql = `UPDATE Tickets set Time= "${Time}", Destination= "${Destination}",\
   Departure = "${Departure}",  Price  ="${Price}"\
    WHERE TicketNo = ${TicketNo}`;
    }
    else {
        saveSQL = `INSERT INTO Tickets (Time,Destination,Departure,Price) VALUES\
        ("${Time}", "${Destination}", "${Departure}", "${Price}" )`;
    }

    console.log(saveSql);

    connection.query(saveSQL, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)

    })

}

exports.fetchRefData = (req, res) => {
    const { tableName, TicketNo, Departure } = req.body;
    let sql = `select ${TicketNo} as TicketNo, ${Departure} as Departure from ${tableName}`;
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) throw err
        res.status(200).send(result);
    })
}
