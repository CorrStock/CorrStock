//index.js
var express      = require('express')        ,
  bodyParser     = require('body-parser')    ,
  methodOverride = require('method-override'),
  path           = require('path')           ,
  http           = require('http')           ,
  morgan         = require('morgan')         ,
  app            = express()                 ,
  clog           = require('simpleclog')     ;

var Twitter = require('./server/apis/twitter.js');
var Quandl = require('./server/apis/quandl.js');
var Google = require('./server/apis/google.js');
var NYT = require('./server/apis/nyt.js');
var Yahoo = require('./server/apis/yahoofinance.js')

//config
app.set('port', process.env.PORT || 3000);
app.use( morgan('dev') );
app.use( bodyParser.urlencoded({'extended':'true'}));
app.use( bodyParser.json() );
app.use( bodyParser.json({ type: 'application/vnd.api+json' }) );
app.use( methodOverride() );
app.use( express.static(path.join(__dirname, '/client')) );


app.post('/api/twitter', function(req,res){
  Twitter.getData(req.body.stock, req.body.startDate, req.body.endDate, function(data){
    clog('Data to get sent from');
    clog(data);
    res.json(data);
  })
});


app.post('/api/quandl', function(req,res){
  Quandl.getData(req.body.stock, req.body.startDate, req.body.endDate, function(data){
    res.json(data);
  })
});


app.post('/api/nyt', function(req,res){
  NYT.getData(req.body.stock, req.body.startDate, req.body.endDate, function(data){
    res.json(data);
  })
});

app.post('/api/google', function(req,res){
  Google.getData(req.body.stock, req.body.startDate, req.body.endDate, function(data){
    res.json(data);
  })
});

app.post('/api/yahoofinance', function(req,res){
  Yahoo.getData(req.body.stock, function(data){
    res.json(data);
  })
});

http.createServer(app).listen(app.get('port'), function(){
  clog('Express server listening on port ' + app.get('port') );
})
