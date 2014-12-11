var corrstock = angular.module('corrstock', []);
function clog(v){console.log(v);}

corrstock.controller('mainController', function($scope, $http) {
  $scope.formData = {};


  $scope.sendStockInfo = function() {
    //Log form date
    console.log($scope.formData)
    // NYT information call
    $http.post('/api/nyt', $scope.formData)
    .success(function(data){
      nytData = data.getData;

      //Stock information call
      $http.post('/api/quandl', $scope.formData )
      .success(function(stockData) {
        clog('successfully posted and returned stock info')
        $scope.stockData = stockData.getData;
         clog("STOCKDATA::::::::::::" + stockData);
      //Render highstock graph
        $('#chart').highcharts('StockChart', {
          rangeSelector : {
              selected : 1
          },
          series : [{
              name : $scope.formData.stock,
              data : stockData,
              tooltip: {
                  valueDecimals: 2
              }
          }]
        });//End highstock graph render


        //Set up corrlation args
        //Array of stock volatlity per day
        stockVolArray = [];
        for (var i=0; i<stockData.length;i++){
          stockVolArray.push(stockData[i][0]);
        }
        //Array of Nyt volatility per day
        newsVolArray = [];
        console.log("NYTDATA", nytData)
        if (nytData){
          for (var i=0; i<nytData.length;i++){
            console.log("HERE",nytData[i][1])
            newsVolArray.push(nytData[i][1]);
          }
        }
        var testArray = [23,45,13,13,23,56,12,7,45,34,2,12,21,24,24,24,10];
        //NYT/stock correlation
        var correlation = parseFloat((getPearsonCorrelation(stockVolArray,testArray) *100).toFixed(2));
        clog('CORRELATION:::::::::' + correlation);

        //CORRELATION GAUGE OPTIONS
        $(function () {

          var gaugeOptions = {

            chart: {
                type: 'solidgauge'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [.7, '#FF0000'], // green
                    [.5, '#F97600'], // yellow
                    [.3, '#F6C600']
                    // [.1, '#60B044'], // red
                ],

                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    y: 0
                },
                labels: {
                    y: 16
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }

          };
          //CORRELATION GAUGE
          $('#correlation-gauge').highcharts(Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: -100,
                max: 100,
                title: {
                    text: null
                }
            },

            series: [{
                name: 'NYT',
                data: [0],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f} %</span><br/>' +
                           '<span style="font-size:12px;color:silver">correlation</span></div>'
                },
                tooltip: {
                    valueSuffix: 'correlation %'
                }
            }]
          }));

          //ANIMATION
          setTimeout(function () {
            chart = $('#correlation-gauge').highcharts();
            if (chart) {
                point = chart.series[0].points[0];
                newVal = correlation;
                point.update(newVal);
            }
          }, 1000);

        });//end gauge

        //re rerender gauge and correlation on range slider adjustments
        // $('.highcharts-navigator-handle-left, .highcharts-navigator-handle-right').mouseup(function(){
        //   $('.highcharts-navigator > path').html(".attr( 'd' ):", function(){

        //   var rangeData = {};
        //   rangeData.stock = $scope.stockData.stock
        //   rangeData.startDate =
        //   rangeData.endDate =

        //   //get new stock info for within range sliders
        //   $http.post('/api/quandl', rangeData  )
        //   .success(function(rangeStockData) {
        //     $scope.rangeStockData = rangeStockData.getData;

        //   //Set up corrlation args
        //   //Array of stock volatlity per day
        //   newStockVolArray = [];
        //   for (var i=0; i<rangeData.length;i++){
        //     newStockVolArray.push(rangeData[i][0]);
        //   }
        //   //Array of nyt volatility per day




        //   //define new correlation
        //   var newCorrelation = parseFloat((getPearsonCorrelation(newStockVolArray,newNytVolArray) *100).toFixed(2));

        //   // change correlation gauge
        //     setTimeout(function () {
        //       chart = $('#correlation-gauge').highcharts();
        //       if (chart) {
        //           point = chart.series[0].points[0];
        //           newVal = newCorrelation;
        //           point.update(newVal);
        //       }
        //     }, 1000);


        //   })//end rangeStockData success
        //  .error(function(data) {
        //     console.log('Error: ' + rangeStockData);
        //   });//end  rangeStockData post request

        // })//end jquery on slider adjustments

      })//end success stockData http request
      .error(function(data) {
        console.log('Error: ' + stockData);
      });
    })//End Nyt get request
  .error(function(data) {
    console.log('Error: ' + data.getData);
  });
};//end sendStockInfo()


//HELPER FUNCTIONS

  // Correlation function
      function getPearsonCorrelation(x, y) {
        var shortestArrayLength = 0;

        if(x.length == y.length) {
            shortestArrayLength = x.length;
        } else if(x.length > y.length) {
            shortestArrayLength = y.length;
            console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
        } else {
            shortestArrayLength = x.length;
            console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
        }

        var xy = [];
        var x2 = [];
        var y2 = [];

        for(var i=0; i<shortestArrayLength; i++) {
            xy.push(x[i] * y[i]);
            x2.push(x[i] * x[i]);
            y2.push(y[i] * y[i]);
        }

        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_x2 = 0;
        var sum_y2 = 0;

        for(var i=0; i< shortestArrayLength; i++) {
            sum_x += x[i];
            sum_y += y[i];
            sum_xy += xy[i];
            sum_x2 += x2[i];
            sum_y2 += y2[i];
        }

        var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
        var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
        var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
        var step4 = Math.sqrt(step2 * step3);
        var answer = step1 / step4;

        return answer;
      };//End correlation function




});//end controller
