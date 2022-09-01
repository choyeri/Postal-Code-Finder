const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user : postalDBUser,
  password : postalDBPassword,
  database : postalDB
});

connection.connect();
console.log('Connect');

module.exports = connection;