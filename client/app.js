var corrStock = angular.module('corrStock', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $scope.sendStockInfo = function() {
    $http.post('/api/twitter-count', $scope.formData)
        .success(function(data) {
          $scope.formData = {};
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  }
}
