var mysql = require('mysql2');
var config = require('./config')

const connection = mysql.createConnection({
  host: config.config.HOST,
  port: config.config.PORT,
  user: config.config.USER,
  password: config.config.PASSWORD,
  database: config.config.DB,
  multipleStatements: config.config.multipleStatements,
  dateStrings: true,
  /*typeCast: function castField( field, useDefaultTypeCasting ) {

    // We only want to cast bit fields that have a single-bit in them. If the field
    // has more than one bit, then we cannot assume it is supposed to be a Boolean.
    if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
 
      var bytes = field.buffer();
 
      // A Buffer in Node represents a collection of 8-bit unsigned integers.
      // Therefore, our single "bit field" comes back as the bits '0000 0001',
      // which is equivalent to the number 1.
      return( bytes[ 0 ] === 1 );
 
    }
 
    return( useDefaultTypeCasting() );
 
  }*/
})

function handleDisconnect() {

  connection.connect((error) => {
    if (error) {
      console.log('Error connecting to the database ' + error);
      setTimeout(handleDisconnect, 10000);
    } else {
      console.log('===========================================================');
      console.log('>>> ⚙️ Successfully connected to the database ' + config.config.DB);
      console.log('===========================================================');
    }
  })

  connection.on('error', function (err) {
    console.log(err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      console.log('PTP TIPS DATABASE CONNECTION LOST' + err);
      handleDisconnect();
    } else {
      handleDisconnect();
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;