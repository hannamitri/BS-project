
/**This class if for creating a pool connection maniely
 * for excessive quering when needed.
 */
let mysql = require("mysql2");
let config = require("./config");
let mysqlPromise = require("mysql2/promise");

let pool;
let con;
let poolPromise;

let db_config = {
  host: config.config.HOST,
  user: config.config.USER,
  password: config.config.PASSWORD,
  database: config.config.DB,
  connectionLimit: 200,
  dateStrings: true,
};

function createCon() {}

module.exports = {
  getPool: function () {
    if (pool) return pool;
    pool = mysql.createPool(db_config);
    return pool;
  },
  getPoolPromise: function(){
    if(poolPromise) return poolPromise;
    poolPromise = mysqlPromise.createPool(db_config);
    return poolPromise;
  },
  createCon: function () {
    if (con) return con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
      if (err) throw err;
      setTimeout(createCon, 2000);
    });
    con.on("error", function (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        createCon();
      } else {
        throw err;
      }
    });
    return con;
  },
};
