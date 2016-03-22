var express = require('express');
var Promise = require('bluebird');
var path = require('path');
// var bodyParser = require('body-parser');

var db = require('./model/db.js');

var Product = db.Product;

var app = express();

app.use('/bower', express.static(path.join(__dirname, '../bower_components')));
app.use('/browser', express.static(path.join(__dirname, '../browser')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, '../browser/views', 'index.html'));
});

app.use('/api/products', require('./routes/api/productsAPI.js'));


//error handling
app.use(function(err, req, res, next){
  console.log(err);
  res.status(err.status || 500);
});
