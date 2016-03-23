var expect = require('chai').expect;
// var seed = require('../seed/seed.js');
var db = require('.././server/model/db.js');
var Promise = require('bluebird');
//
var Product = db.Product;
//
var data = [
    { name: 'Brushing',
      priority: 1
    },
    { name: 'Heinie Fur Trimming',
      priority: 6
    },
    { name: 'Claw Trimming',
      priority: 5
    },
    { name: 'Catnip Meditation',
      priority: 7
    },
    { name: 'Paw Pad Massage',
      priority: 4
    },
    { name: 'Eye Goobie Removal',
      priority: 9
    },
    { name: 'Tree Climbing Experience',
      priority: 2
    }
];

var dataMaker = function( next){
  return db.connect()
    .then(function(){
      return Promise.all([Product.remove({})]);
      // Product.remove();
    })
    .then (function(){
      // console.log('data is', data);
      var Promises = data.map(function(_product){
        // console.log('a product is',_product);
        return Product.create(_product);
      });
      // console.log(Promises);
      return Promises;
    })
    .then (function(Promises){
      Promise.all(Promises);
    });

};


// console.log("seed is", seed);
describe('model testing', function(){
  beforeEach(function(done){
        dataMaker()
      .then(function(){
        done();
      });
  });//end beforeEach

  describe('get all products', function(){
  var products;
  beforeEach(function(done){
    Product.find()
      .then(function(_products){
        products = _products;
        done();
      }, done);
  });

  it('Number of found products is correct at 7', function(){
    expect(products.length).to.equal(7);
  });

  it('First product name is Brushing', function(){
    expect(products[0].name).to.equal("Brushing");
  });

  it('Last product name is Tree Climbing Experience', function(){
    expect(products[6].name).to.equal("Tree Climbing Experience");
  });
});
  describe('get a product', function(){
  var product;
  beforeEach(function(done){
    Product.findOne({ name: 'Catnip Meditation'})
      .then(function(_product){
        product = _product;
        done();
      }, done);
  });

  // it('Number of found products is correct at 1', function(){
  //   expect(product.length).to.equal(1);
  // });

  it('First product name is Catnip Meditation', function(){
    expect(product.name).to.equal('Catnip Meditation');


  // it('Last product name is Tree Climbing Experience', function(){
  //   expect(products[6].name).to.equal("Tree Climbing Experience");
  // });

});//end describe block
});//end describe block
});//end describe overall
