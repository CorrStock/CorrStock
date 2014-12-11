var clog  = require('simpleclog');
var http = require('http');
var moment = require('moment');
require('twix');
var request = require('request');
var q = require('q');
var apikey = 'e674492d62783a2a0fba9ccd14b75e19:6:69091683';

//function to get data from quandl
var getData = function(stock, startDate, endDate, callback){

  //CODE TO REMOVE WEEKENDS
  // var days = moment(new Date(startDate)).twix(new Date(endDate));

  // var dayArray = days.iterate("days");
  // clog('DAYARRAY:::::: ' + dayArray);

  // // removing days that are weekends
  // var range = [];
  // while(dayArray.hasNext()){
  //   var currentDay = dayArray.next();
  //   var dayNumber = currentDay.toDate().getDay();
  //   if(dayNumber !== 0 && dayNumber !== 6){
  //     outerRange.push(day.toISOString().slice(0,10));
  //   }
  // }
  // clog('DAY RANGE/NO WEEKENDS:::::: ' + range)

  var startDate = new Date(startDate).toISOString().slice(0,10).replace(/-/g, '');
  var endDate = new Date(endDate).toISOString().slice(0,10).replace(/-/g, '');


  //get all pub dates of articles that contain stock
  var getNytData = function(page){

      var results = [];
      var defer = q.defer();

      var recurs = function(page, callback){
        page = page || 0;
        var string = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=apple&page=' + page + '&facet_field=source&sort=oldest&begin_date=' + startDate + '&end_date=' + endDate +'&api-key=' + apikey
        request(string, function(err, res, body){
          if (err){
            console.log('ERROR', err);
          } else if (body) {
            body = JSON.parse(body);
            for (var i = 0; i < body['response']['docs'].length; i++){
              //pushing only publication dates to results
              if(body['response']['docs'][i]['pub_date']){
                var day = moment(new Date(body['response']['docs'][i]['pub_date']))
                var dayNum = day.toDate().getDay();
                if(dayNum !== 0 && dayNum !== 6){
                  results.push(day.toISOString().slice(0,10));
                }
              }
            }
            if (body['response']['docs'].length > 0){
              page++;
              recurs(page, callback);
            } else {
              callback(results);
            }
          }
        })
      }
      recurs(0, function(results){
        defer.resolve(results);
      });
    return defer.promise;
  };//end function

  getNytData().then(function(data){
    var dateObj = {};

    for (var i = 0; i < data.length; i++){
      data[i] = data[i].slice(0,10);
      if (dateObj[data[i]] >= 0){
        dateObj[data[i]] += 1;
      } else {
        dateObj[data[i]] = 0;
      }
    }

    //set up array of array date and coutn of articles
    var result = [];
    // var day = [];
    for (var key in dateObj){
      result.push([key,dateObj[key]])
    }
     for (var i in result){
      result[i][0] = new Date(result[i][0]).getTime();
    }
    console.log("RESULT::::::", result);
    callback(result)
  });


};//end getData

module.exports = {getData:getData};
