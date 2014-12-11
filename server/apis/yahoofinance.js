var clog  = require('simpleclog');
var http = require('http');

//function to get data from yahoo
var getData = function(stock, callback){

  var string = 'http://finance.yahoo.com/rss/headline?s=' + stock;



  http.get(string, function(res){
    var output = '';

    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      var obj = output;
      // clog(obj);
      // callback(obj)
    });
  });



};

getData('yhoo', function(){});

module.exports = {getData:getData};
