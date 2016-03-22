var express = require('express');
var Promise = require('bluebird');
var path = require('path');
// var bodyParser = require('body-parser');

var db = require('./model/db');


var app = express();

app.use('/bower', express.static(path.join(__dirname, '../bower_components')));

app.use('/browser', express.static(path.join(__dirname, '../browser')));


module.exports = app;

app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, '../browser/views', 'index.html'));
});

//could probably just name file products
app.use('/api/products', require('./routes/api/productsAPI'));


//error handling
app.use(function(err, req, res, next){
  console.log(err);
  res.status(err.status || 500);
});
