function clog(v){console.log(v);}
var https = require('https');

//function to get data from quandl
var getData = function(stock, startDate, endDate, callback){

  //http request stock data from quandl
  var longString = 'https://www.quandl.com/api/v1/datasets/WIKI/' +
                   stock.toUpperCase() +
                   '.json?auth_token=Lmzt-LAWzHDzykUrZYU8&column=4&collapse=daily&trim_start=' +
                   startDate + '&trim_end=' + endDate + '&sort_order=asc&transformation=rdiff';

  // var tempString = 'https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?trim_start=2015-05-19&trim_end=2015-05-19'

  https.get(longString, function(res){
    var output = '';

    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      var obj = JSON.parse(output);
      clog('YES PARSED BELOW')
      clog('QUANDL\n' + obj.data)
    });
  })

  //do callback inside res.on('end')



};

getData('MSFT','2014-11-01','2014-11-08',function(){});

module.exports = {getData:getData};
