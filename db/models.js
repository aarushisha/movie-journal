const connection = require('./index.js')

module.exports.addMovieDB = (movie, callback) => {
  connection.query(`INSERT INTO movies (title, poster, year, genre, rated, watched) VALUES ("${movie.title}", "${movie.poster}", ${movie.year}, "${movie.genre}", "${movie.rated}", ${movie.watched})`, callback);
}

module.exports.getMovieDB = (callback) => {
  connection.query(`SELECT id, title, poster, year, genre, rated, watched, created, updated FROM movies`, callback);
}

module.exports.deleteMovieDB = (id, callback) => {
  connection.query(`DELETE FROM movies WHERE id=${id}`, callback);
}

module.exports.watchMovieDB = (id, callback) => {
  connection.query(`UPDATE movies SET watched = true, updated = NOW() WHERE id=${id}`, callback)

}