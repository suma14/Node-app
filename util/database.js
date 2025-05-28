// const mysql = require("mysql2");
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "BrightSky_66",
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "BrightSky_66", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
