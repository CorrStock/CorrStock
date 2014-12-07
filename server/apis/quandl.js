function clog(v){console.log(v);}
var https = require('https');

//function to get data from quandl
var getData = function(stock, startDate, endDate, callback){

  //http request stock data from quandl
  var longString = 'https://www.quandl.com/api/v1/datasets/WIKI/' +
                   stock.toUpperCase() +
                   '.json?auth_token=Lmzt-LAWzHDzykUrZYU8&column=4&collapse=weekly&trim_start=' +
                   startDate + '&trim_end=' + endDate + '&sort_order=asc&transformation=rdiff';

  var data = https.get(longString, function(res) {
      console.log('Got response: ' + res.statusCode);
      clog(res);
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
  });

    var results= {
      data: data
    };

    callback(results);
};

// getData('AAPL','2014-12-03','2014-12-05',function(){});

module.exports = {getData:getData};
