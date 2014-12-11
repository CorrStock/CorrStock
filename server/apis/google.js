var clog  = require('simpleclog');
var http = require('http');

var apikey = 'AIzaSyBHWWxiBQ5uqBzpy9bpyS1g3TctEBHndEk';
var cx     = '015698937417642655162:qhgwot3phos';
//function to get data from quandl
var getData = function(stock, startDate, endDate, callback){

  //http request stock data from quandl
  // var longString = 'https://www.googleapis.com/customsearch/v1?key=' + apikey + '&cx=' + cx + '&q=v'a+rtock;
  // var otherString = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBHWWxiBQ5uqBzpy9bpyS1g3TctEBHndEk&cx=015698937417642655162:qhgwot3phos&q=' + stock;
  var string = 'http://www.google.com/trends/fetchComponent?q=' + stock +'&cid=TIMESERIES_GRAPH_0&export=3'

  http.get(string, function(res){
    var output = '';

    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      var obj = output;
      // clog('OBJ below')
      // clog(obj)
      // for(var key in obj){
      //   clog('keys')
      //   clog(obj[])
      // }
    });
  })

  //do callback inside res.on('end')



};

getData('MSFT','2014-12-01','2014-12-07',function(){});

module.exports = {getData:getData};
