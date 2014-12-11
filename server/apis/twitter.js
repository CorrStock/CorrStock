// //   server/apis/twitter.js
// //   Queries the Twitter API via Twit module.
// var clog   = require('simpleclog');
// var moment = require('moment');
// require('twix');
// var Twit = require('twit');

// var T = new Twit({
//     consumer_key:         'AlOzrDBPdchFzvPPhhWFLtfTe'
//   , consumer_secret:      'Cmi5rwFAgw5iJwAY1WCs7VEKA47I6XZtzrSsqTxpZi9fvWlhQ2'
//   , access_token:         '53014080-1nJM35shK9oKQIaFG8VujKMYqCaa5of5nZcnRMK1p'
//   , access_token_secret:  '7V8HvNMrzKxYxMQXLbcDfAUX7TPSOltcb0TprkBUe95fN'
// });

// //Function to find retweet count for time interval
// //TODO: use parameters from getData inside T.get instead of hard coded values
// //Purpose: queries twitter api with values obtained from client side
// var getData = function(stock, startDate, endDate, callback){
//     //Date Range fucntion to create an array of ISO dates

//   var iteration = moment(new Date(startDate)).twix(new Date(endDate)).iterate("days");


//   //removing days that are weekends
//   // var outerRange = [];
//   // while(iteration.hasNext()){
//   //   var currentDay = iteration.next();
//   //   var dayNumber = currentDay.toDate().getDay();
//   //   if(dayNumber !== 0 && dayNumber !== 6){
//   //     outerRange.push(day.toISOString().slice(0,10));
//   //   }
//   // }

//   var queryObjHardCode = {
//     q:     'MSFT since:2014-11-20 until:2014-12-06',
//     count: 100000
//   };
//   var otherObj = { q: stock + ' since: ' + startDate + ' until: ' + endDate, count: 10000000 };

//   T.get('search/tweets', queryObjHardCode, function(err, data, response){

//     var itr = moment(new Date(startDate)).twix(new Date(endDate)).iterate("days");


//     //removing days that are weekends
//     var range = [];
//     while(itr.hasNext()){
//       var day = itr.next();
//       var dayNum = day.toDate().getDay();
//       if(dayNum !== 0 && dayNum !== 6){
//         range.push(day.toISOString().slice(0,10));
//       }
//     }

//     var dataArray = [];
//     var dayCount = 0;

//     for (var n=0; n < range.length; n++) {
//       dayCount = 0;
//       for (var i=0; i < data.statuses.length; i++) {
//         var twitDate = moment(data.statuses[i].created_at).toISOString().slice(0,10);
//         if (twitDate === range[n]) {
//           dayCount += data.statuses[i].retweet_count;
//         }
//       }
//       clog('range[n] below :' + n)
//       clog(range[n])
//       clog('dayCount :' + n)
//       clog(dayCount + "<---- day count")
//       dataArray.push([range[n], dayCount]);
//     }
//     clog('dataArray below::::');
//     clog(dataArray);
//     callback(dataArray);

//   })




//   clog('HEY ROHAN')
//   clog('HEY ROHAN')
//   clog('HEY ROHAN')
//   clog('HEY ROHAN')

//   //linter for checking if variables dont exist



//     // var itr = moment(new Date(startDate)).twix(new Date(endDate)).iterate("days");

//     // // .add("days",1)
//     // //removing days that are weekends
//     // var range = [];
//     // while(itr.hasNext()){
//     //   var day = itr.next();
//     //   var dayNum = day.toDate().getDay();
//     //   if(dayNum !== 0 && dayNum !== 6){
//     //     range.push(day.toISOString().slice(0,10));
//     //   }
//     // }
//     // var dataArray = [];


//     // //iterate over dateRange
//     // clog('right before range loop')
//     // for(var i=0; i < range.length; i++){
//     //   var date = range[i];
//     //   //Iterate over all statuses
//     //   (function(date, i) {
//     //     var dateUntil
//     //     //can't let it go outside of the array and pass 'undefined' to the twitter query
//     //     if(i === range.length-1){
//     //       dateUntil = ' until:'+ range[i];
//     //     }
//     //     else {
//     //       dateUntil =' until:'+ range[i+1];
//     //     }
//     //     clog('right before T.get');
//     //     var queryObj = { q: stock +' since:' + range[i] + dateUntil, count: 10000000 };
//     //     T.get('search/tweets', queryObj , function(err, data, response) {
//     //       clog('INSIDE T.get');
//     //       var dayCount = 0;
//     //       for (var n=0; n < data.statuses.length; n++) {
//     //         //Create twitDate as ISO string
//     //         var twitDate = moment(data.statuses[n].created_at).toISOString().slice(0,10);
//     //         //Get retweets count for day
//     //         if (twitDate === date){
//     //           dayCount += data.statuses[n].retweet_count;

//     //         }
//     //       }
//     //       //push to dataArray
//     //       dataArray[i] = [date, dayCount];
//     //     });
//     //   })(date, i);
//     // };


//     // var results= {
//     //   dataArray: dataArray
//     // };
//     // clog('sending the twitter data!');
//     // clog(dataArray);
//     // callback(results);
// };

// getData('apple','2014-12-03','2014-12-08',function(){});

// module.exports = {getData:getData};










