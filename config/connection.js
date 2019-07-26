
var mysql = require('mysql');
var connection;
if (process.env.JAWSDB_URL){
  connecttion = mysql.createConnection(process.env.jawsdb_url);
} else {
  connection = mysql.createConnection({
    
  
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burger_db"
  });
};
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  module.exports = connection;