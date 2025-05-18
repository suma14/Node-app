const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "BrightSky_66",
});

module.exports = pool.promise();
