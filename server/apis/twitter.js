//   server/apis/twitter.js
//   Queries the Twitter API via Twit module.
function clog(v){console.log(v);}
var moment = require('moment');
require('twix');
var Twit = require('twit');

var T = new Twit({
    consumer_key:         'AlOzrDBPdchFzvPPhhWFLtfTe'
  , consumer_secret:      'Cmi5rwFAgw5iJwAY1WCs7VEKA47I6XZtzrSsqTxpZi9fvWlhQ2'
  , access_token:         '53014080-1nJM35shK9oKQIaFG8VujKMYqCaa5of5nZcnRMK1p'
  , access_token_secret:  '7V8HvNMrzKxYxMQXLbcDfAUX7TPSOltcb0TprkBUe95fN'
});

//Function to find retweet count for time interval
//TODO: use parameters from getData inside T.get instead of hard coded values
//Purpose: queries twitter api with values obtained from client side
var getData = function(stock, startDate, endDate, callback){

    //Date Range fucntion to create an array of ISO dates
    var itr = moment.twix(new Date(startDate),new Date(endDate)).iterate("days");
    var range= [];
    while(itr.hasNext()){
      range.push(itr.next().toDate().toISOString().slice(0,10));
    }

    var dataArray = [];

    clog(itr);

    //iterate over dateRange
    for(var i=0; i < range.length; i++){
      var date = range[i];

      // clog(date);
      // var dayCount = 0;
      //Iterate over all statuses
      (function(date, i) {
        // if(range[i])
        T.get('search/tweets', { q: stock +' since:' + range[i] +' until:'+ range[i+1], count: 10000000}, function(err, data, response) {

          var dayCount = 0;
          clog(data);
          for (var n=0; n < data.statuses.length; n++) {
            //Create twitDate as ISO string
            var twitDate = moment(data.statuses[n].created_at).toISOString().slice(0,10);
              //Get retweets count for day
              if (twitDate === date){
                dayCount += data.statuses[n].retweet_count;

              }
          }
          //push to dataArray
          dataArray[i] = [date, dayCount];
          clog(dataArray);
        });
      })(date, i);

      clog(date);
    };


    var results= {
      dataArray: dataArray
    };

    // callback(results);
};

getData('facebook','2014-12-01','2014-12-05',function(){});

module.exports = {getData:getData};










