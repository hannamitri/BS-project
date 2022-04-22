var config = {
  PORT: 3306,
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "citizenwebportal",
  multipleStatements: true,
};

module.exports = {
  config: config,
  JWT_SECRET: "SPSJwtSec",
};
