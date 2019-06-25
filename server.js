const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;
const connection = require('./db/index.js');

const app = express();

app.use(express.static(__dirname + '/client/public/'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/addMovie', (req, res) => {
  // var movieName = ;
  // var year = ;
  // var genre = ;
  // var rated = ;

})


app.listen(port, function() {
  console.log('listening on port ', port);
});