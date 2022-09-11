const mysql = require('mysql2');



//database configuration exported as connection.
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root", 
    password: "TOMORROWLAND2018", 
    database: "bank" 
  });

// Connect to the database and make sure to log a message related to the connection state 

module.exports = {connection}
