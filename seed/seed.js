var db = require('.././server/model/db.js');
var Promise = require('bluebird');

var Product = db.Product;

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
    { name: 'Brush Teeth',
      priority: 3
    },
    { name: 'Paw Pad Massage',
      priority: 2
    },
    { name: 'Eye Goobie Removal',
      priority: 9
    }
];

var dataMaker = function( next){
  return db.connect()
    .then(function(){
      return Promise.all([Product.remove()]);
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

dataMaker();
