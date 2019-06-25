const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;
const connection = require('./db/index.js');
const models = require('./db/models.js');
const addMovieDB = models.addMovieDB;

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
  movie.watched = false;
  addMovieDB(movie, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(results);
    }
  });
})


app.listen(port, function() {
  console.log('listening on port ', port);
});