var router = require('express').Router();
module.exports = router;
var Product = require('../.././model/db.js').Product;

router.get('/', function(req, res, next){
  Product.find({})
  .then(function(products){
    res.json(products);
  }, next);
});

router.get('/:id', function(req, res, next){
  Product.findOne({ _id: req.params.id})
  .then(function(product){
    res.json(product);
  }, next);
});

router.post('/', function(req, res, next){
  // console.log(req.body);
  Product.create(req.body)
  .then(function(product){
    console.log("new product created ;", product);
    res.redirect('/');
    res.sendStatus(200);
  }, next);
});

// router.delete('/:id', function(req, res, next){
//   Product.remove({_id: req.params.id})
//   .then(function(){
//     console.log('one product deleted');
//     return res.sendStatus(204);
//   })
//   .then(function(){
//     res.redirect('/');
//     }, next);
// });

router.delete('/:id', function(req, res, next){
  Product.remove({_id: req.params.id})
  .then(function(){
    console.log('one product deleted');
    res.sendStatus(204);
  });
});
