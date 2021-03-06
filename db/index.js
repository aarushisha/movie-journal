const mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  pw: ""
});

connection.connect(error => {
  if (error) {
    console.log(error);
  } else {
    console.log('connected')
  }
});

connection.query('CREATE DATABASE IF NOT EXISTS movies', function(err, results) {
  if (err) {
    console.log(err)
  } else {
    console.log(results);
  }
});

connection.query('USE movies', function(err, results) {
  if (err) {
    console.log(err)
  } else {
    console.log(results);
  }
});

connection.query('CREATE TABLE IF NOT EXISTS movies (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100), poster VARCHAR(500), year VARCHAR(20), genre VARCHAR(100), type VARCHAR(20), rated VARCHAR(20), watched BOOLEAN NOT NULL, created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updated DATETIME, userRating INT, userThoughts LONGTEXT)', function(err, results) {
  if (err) {
    console.log(err)
  } else {
    console.log(results);
  }
})

module.exports = connection;