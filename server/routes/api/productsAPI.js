//rename this file products.js
var router = require('express').Router();
module.exports = router;
var Product = require('../.././model/db.js').Product;

//use a put-- make it RESTFUL
router.post('/update/:id/:priority', function(req, res, next){
  Product.findOne({_id: req.params.id})
  .then(function(product){
    product.priority = req.params.priority;
    product.save();
  })
  .then(function(product){
    res.sendStatus(200);//you wanna send updated product?
  }, next);
});

//what does this do?
router.get('/onePriority', function(req, res, next){
  Product.findOne({priority: 1})
  .then(function(foundProduct){
    res.json(foundProduct);
  });
});

//put this on the top
router.get('/', function(req, res, next){
  Product.find({})
  .then(function(products){
    res.send(products);
  }, next);
});

router.get('/:id', function(req, res, next){
  Product.findOne({ _id: req.params.id})
  .then(function(product){
    res.send(product);
  }, next);
});


router.post('/', function(req, res, next){
  Product.create(req.body)
  .then(function(product){
    res.sendStatus(200);
  }, next);
});

//looks good
router.delete('/:id', function(req, res, next){
  Product.remove({_id: req.params.id})
  .then(function(){
    console.log('one product deleted');
    res.sendStatus(204);
  });
});
