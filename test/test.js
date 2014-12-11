var requestJson = require('request-json'); //https://www.npmjs.org/package/request-json
var expect      = require('chai').expect;
var Twitter     = require('../server/apis/twitter.js');
var Quandl      = require('../server/apis/quandl.js');
var clog        = require('simpleclog');
var sinon       = require('sinon');
//!!
// be sure to 'nodemon index.js' in root directory before doing 'npm test' in root directory
//!!

clog(sinon);



var client;
beforeEach(function(){
  client = requestJson.newClient('http://localhost:3000');
});



describe("Server side API functioning", function() {
  it("should serve static files", function(done) {
    client.get('/', function(err, res, body){
      expect(body.toString().match(/<html/)).to.be.ok;
      done();
    });
  });

  //shortly

  it('twitter-should return a value from POSTing stock,startDate, endDate to /api/twitter-count', function(done){
    //'stock' isn't actually limited to only stock symbols, but really any word that you want
    //to check the frequency on twitter for
    var objToTwitter = {
      stock:      'apple',
      startDate:  '2014-12-05',
      endDate:    '2014-12-10'
    };
    client.post('/api/twitter', objToTwitter, function(err, res, body){
      expect(body.dataArray).to.be.an('array');
      done();
    });
  });

  it('quandl-should return a value from POSTing stock,startDate, endDate to /api/quandl', function(done){
    //'stock' isn't actually limited to only stock symbols, but really any word that you want
    //to check the frequency on twitter for
    var objToQuandl = {
      stock:      'microsoft',
      startDate:  '2014-12-05',
      endDate:    '2014-12-10'
    };
    client.post('/api/quandl', objToQuandl, function(err, res, body){
      expect(body.dataArray).to.be.an('array');
      done();
    });
  });


//check functions that do significant work
//if inputs give the right outputs
//make sure getData
//do special cases behave appropriately like in a function
//able to refactor


});










