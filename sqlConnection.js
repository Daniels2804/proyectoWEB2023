// Importing MySQL module
const mysql = require("mysql2");

const port = require("./config");
  
// Creating connection
let db_con = mysql.createConnection({
  host: port.DB_HOST,
  user: port.DB_USER,
  password: port.DB_PASSWORD,
  database: port.DB_NAME,
  port: port.DB_PORT
});
  
// Connect to MySQL server
db_con.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});
  
module.exports = db_con;