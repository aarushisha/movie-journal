const connection = require('./index.js')

module.exports.addMovieDB = (movie, callback) => {
  connection.query(`INSERT INTO movies (title, year, genre, rated, watched) VALUES ("${movie.title}", ${movie.year}, "${movie.genre}", "${movie.rated}", ${movie.watched})`, callback);
}

module.exports.getMovieDB = (callback) => {
  connection.query(`SELECT id, title, year, genre, rated, watched FROM movies`, callback);
}