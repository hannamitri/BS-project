var mysql = require("mysql2");
var config = require("./config");

const connection = mysql.createConnection({
  host: config.config.HOST,
  port: config.config.PORT,
  user: config.config.USER,
  password: config.config.PASSWORD,
  database: config.config.DB,
  multipleStatements: config.config.multipleStatements,
  dateStrings: true,
});

function handleDisconnect() {
  connection.connect((error) => {
    if (error) {
      console.log("Error connecting to the database " + error);
      setTimeout(handleDisconnect, 10000);
    } else {
      console.log(
        "===========================================================",
      );
      console.log(
        ">>> ⚙️ Successfully connected to the database " + config.config.DB,
      );
      console.log(
        "===========================================================",
      );
    }
  });

  connection.on("error", function (err) {
    console.log(err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
      console.log("PTP TIPS DATABASE CONNECTION LOST" + err);
      handleDisconnect();
    } else {
      handleDisconnect();
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;