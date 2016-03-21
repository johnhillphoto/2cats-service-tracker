var twoCatsApp = angular.module('twoCatsApp', []);
twoCatsApp.controller('catController', function($http, $scope, $log){

  $http.get('/api/products')
    .then(function(response){
      $log.log('the response is,', response.data);
      return response;
    })
    .then(function(products){
       $scope.products = products.data;
    }).catch($log.error);

  $scope.deleteProduct = function(_id){
    $log.log('imma gonna delete with ma laser cannon', _id);
    $http.delete('/api/products/'+_id)
      .then(function(response){
        $log.log('one product deleted inside angular');
      })
      .then(function(){

      }).catch($log.error);
  };//end deleteProduct

});//end twoCatsApp controller
