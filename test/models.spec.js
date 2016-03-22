var expect = require('chai').expect;
var db = require('./model/db.js');
var seed = require('../seed/seed.js');
var Product = db.Product;

describe('model testing', function(){
  beforeEach(function(done){
    seed()
      .then(function(){
        done();
      });

  });
});
