const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;
const connection = require('./db/index.js');
const models = require('./db/models.js');
const addMovieDB = models.addMovieDB;
const getMovieDB = models.getMovieDB;
const deleteMovieDB = models.deleteMovieDB;

const app = express();

app.use(express.static(__dirname + '/client/public/'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/addMovie', (req, res) => {
  var movie = {};
  movie.title = req.body.Title;
  movie.year = req.body.Year;
  movie.genre = req.body.Genre;
  movie.rated = req.body.Rated;
  movie.poster = req.body.Poster;
  movie.watched = false;
  console.log(movie);
  addMovieDB(movie, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(results);
    }
  });
});

app.get('/getMovie', (req, res) => {
  getMovieDB((err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.post('/deleteMovie', (req, res) => {
  var id = req.body.id;
  deleteMovieDB(id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});


app.listen(port, function() {
  console.log('listening on port ', port);
});