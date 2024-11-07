const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  database: "quiz",
  user: "root",
  password: "",
  multipleStatements: true,
});

conn.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL Database is connected Successfully");
  }
});

module.exports = conn;
