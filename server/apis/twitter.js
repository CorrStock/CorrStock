//   server/apis/twitter.js
//   Queries the Twitter API via Twit module.

var Twit = require('twit');

var T = new Twit({
    consumer_key:         'AlOzrDBPdchFzvPPhhWFLtfTe'
  , consumer_secret:      'Cmi5rwFAgw5iJwAY1WCs7VEKA47I6XZtzrSsqTxpZi9fvWlhQ2'
  , access_token:         '53014080-1nJM35shK9oKQIaFG8VujKMYqCaa5of5nZcnRMK1p'
  , access_token_secret:  '7V8HvNMrzKxYxMQXLbcDfAUX7TPSOltcb0TprkBUe95fN'
});

//Format Today for twitter search
var today = new Date(Date.now());
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
}
if(mm<10){
    mm='0'+mm;
}
var today = yyyy+'-'+mm+'-'+dd+'-';

//Date Range fucntion to create an array of dates
//TODO: document what parameters here represent
//   var itr = moment.twix(new Date('2012-01-15'),new Date('2012-01-20')).iterate("days");
// var range=[];
// while(itr.hasNext()){
//     range.push(itr.next().toDate())
// }

//Function to find retweet count for time interval
//TODO: use parameters from getData inside T.get instead of hard coded values
//Purpose: queries twitter api with values obtained from client side
var getData = function(stock, startDate, endDate, callback){
  T.get('search/tweets', { q: 'microsoft since:2014-12-1 until:'+ today, count: 10000000}, function(err, data, response) {

    // dateRange( startDate, endDate, 1);
    // var data = [];
    // dayCount = 0;
    // day= '';
    for (var i=0; i < data.statuses.length; i++) {
      dayCount += data.statuses[i].retweet_count;
    };
    data = dateIntervalCount;
    callback(result);
  });
};

module.exports = {getData:getData};





