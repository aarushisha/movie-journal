const connection = require('./index.js')

module.exports.addMovieDB = (movie, callback) => {
  connection.query(`INSERT INTO movies (title, year, genre, rated, watched) VALUES ("${movie.title}", ${movie.year}, "${movie.genre}", "${movie.rated}", ${movie.watched})`, callback);
}