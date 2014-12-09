var corrstock = angular.module('corrstock', []);
function clog(v){console.log(v);}

corrstock.controller('mainController', function($scope, $http) {
  $scope.formData = {};

  $scope.sendStockInfo = function() {
    console.log($scope.formData)
    //Twiiter information call
    // $http.post('/api/twitter', $scope.formData)
    // .success(function(data)
    //   $scope.twitterData = data.getData;;
    //   console.log(data);
    // })
    // .error(function(data) {
    //   console.log('Error: ' + data.getData);
    // });
    //Stock inforomation call
    $http.post('/api/quandl', $scope.formData )
    .success(function(data) {
      clog('successfully posted and returned')
      $scope.stockData = data.getData;
      clog(data);

      $('#container').highcharts('StockChart', {
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                second: '%Y-%m-%d<br/>%H:%M:%S',
                minute: '%Y-%m-%d<br/>%H:%M',
                hour: '%Y-%m-%d<br/>%H:%M',
                day: '%Y<br/>%m-%d',
                week: '%Y<br/>%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        rangeSelector : {
            selected : 1
        },
        series : [{
            name : $scope.formData.stock,
            data : data,
            tooltip: {
                valueDecimals: 2
            }
        }]
      });

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };//end sendStockInfo()

});//end controller
