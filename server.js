const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;

const app = express();

app.use(express.static(__dirname + '/client/public/'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.listen(port, function() {
  console.log('listening on port ', port);
});