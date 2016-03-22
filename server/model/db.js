//good.. make sure you can write this from scratch-- connect and disconnect
//require as needed
var Promise = require('bluebird');
var mongoose = require('mongoose');

//define schemas etc up here
var productSchema = mongoose.Schema({
  name: String,
  priority: Number
});

var Product = mongoose.model('product', productSchema);

//now connection goodness
var _conn;

function connect(){
  if(_conn)
    return _conn;
  _conn = new Promise(function(resolve, reject){
    mongoose.connect(process.env.CONN, function(err){
      if(err)
        return reject('make sure mongo is running on this machine');
      resolve(mongoose.connection);
    });
  });
  return _conn;
}

function disconnect(){
  return new Promise(function(resolve, reject){
    mongoose.disconnect(function(){
      _conn = null;
      resolve();
    });
  });
}

module.exports = {
  connect: connect,
  disconnect: disconnect,
  Product: Product
};
