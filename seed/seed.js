var db = require('../server/model/db.js');

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

module.exports = function(){
  return db.connect()
    .then(function(){
      return Product.remove();
    })
    .then (function(){
      return Product.create(data);
    });
};
