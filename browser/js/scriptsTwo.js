var twoCatsApp = angular.module('twoCatsApp', []);
twoCatsApp.controller('catController', function($http, $scope, $log){

var getProducts = function(){
  $http.get('/api/products')
    .then(function(response){
      $scope.products = response.data;
    }).catch($log.error);
};

getProducts();

  $scope.deleteProduct = function(_id){
    $log.log('imma gonna delete with ma laser cannon', _id);
    $http.delete('/api/products/'+_id)
      .then(function(response){
        $log.log('one product deleted inside angular');
        getProducts();
      }).catch($log.error);
  };//end deleteProduct

});//end twoCatsApp controller
