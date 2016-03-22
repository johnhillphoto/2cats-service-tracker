var twoCatsApp = angular.module('twoCatsApp', []);
twoCatsApp.controller('catController', function($http, $scope, $log){

//or sort on the server?
var getProducts = function(){
  $http.get('/api/products')
    .then(function(response){
      var products = response.data;
      $scope.products = products.sort(function(a, b) {
          return parseFloat(a.priority) - parseFloat(b.priority);
        });
      // $scope.products = products;
    }).catch($log.error);
};

getProducts();

  $scope.deleteProduct = function(_id){
    $http.delete('/api/products/'+_id)
      .then(function(response){
        $log.log('one product deleted inside angular');
        getProducts();//good!
      }).catch($log.error);
  };//end deleteProduct
  $scope.formInfo = {};

  $scope.addProduct = function(){
    $log.log('gonna add a product', $scope.formInfo);
    $http.post('/api/products/', $scope.formInfo)
    .then(function(response){
      $log.log('one product added inside angular');
      getProducts();//good!
    }).catch($log.error);
  };

  //see my solution-- I just ended up swapping products, then looping over them and setting priority to index
  $scope.upPriority = function(_id){
    $http.get('/api/products/onePriority')
    .then (function(response){
      var product = response.data;
      $log.log('priority', response.data);
      if (response.data !== null){
        $log.log('got to here');
        $http.post('api/products/update/'+product._id+'/2')
        .then(function(response){
          $log.log("top product moved down one");
        });
      } //end if
      $http.post('api/products/update/'+_id+'/1')
      .then(function(){
        $log.log("arrow moved product to spot one");
        getProducts();
      });
      });
  };
  $scope.downPriority = function(_id, priorityNum){
      var newPriority = priorityNum+1;
      console.log('newPriority', newPriority, 'api/products/update/' + _id + '/' + newPriority);
      $http.post('api/products/update/' + _id + '/' + newPriority)
      .then(function(){
        $log.log(" down arrow moved product down one spot");
        getProducts();
      });
  };//end downPriority

});//end twoCatsApp controller
