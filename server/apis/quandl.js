var clog  = require('simpleclog');
var https = require('https');

//function to get data from quandl
var getData = function(stock, startDate, endDate, callback){
  // stockDate =
  //http request stock data from quandl
  var longString = 'https://www.quandl.com/api/v1/datasets/WIKI/'                              +
                   stock.toUpperCase()                                                         +
                   '.json?auth_token=Lmzt-LAWzHDzykUrZYU8&column=4&collapse=daily&trim_start=' +
                   startDate + '&trim_end=' + endDate + '&sort_order=asc&transformation=rdiff';


  https.get(longString, function(res){
    var output = '';

    res.on('data', function (chunk) {
        output += chunk;
    });

    res.on('end', function() {
      var arrOfArr = JSON.parse(output).data;

      for(var i = 0; i < arrOfArr.length;i++){
        arrOfArr[i][0] = new Date(arrOfArr[i][0]).getTime();
        arrOfArr[i][1] = arrOfArr[i][1]*100;
      }

      callback(arrOfArr);
    });
  })

  //do callback inside res.on('end')


};

module.exports = {getData:getData};


