//index.js
function clog(v){console.log(v);}

var express      = require('express')        ,
  bodyParser     = require('body-parser')    ,
  methodOverride = require('method-override'),
  path           = require('path')           ,
  http           = require('http')           ,
  morgan         = require('morgan')         ,
  app            = express()                 ;

var Twitter = require('./server/apis/twitter.js');
var Quandl = require('./server/apis/quandl.js');

//config
app.set('port', process.env.PORT || 3000);
app.use( morgan('dev') );
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use( bodyParser.json() );
app.use( bodyParser.json({ type: 'application/vnd.api+json' }) );
app.use( methodOverride() );
app.use( express.static(path.join(__dirname, '/client')) );





//api routes
//Purpose:
app.post('/api/twitter', function(req,res){
  // console.log(req.body)
  // res.json( {woo:999} );
  Twitter.getData(req.body.stock, req.body.startDate, req.body.endDate, function(data){
    //data is being retrieve from get data correct...
    //but for the test to get it back in time is apparently too long
    clog("TWIT TOPPP");
    clog(data);
    clog("TWIT BOTTOM");
    res.json(data);
  })
});


app.post('/api/quandl', function(req,res){
  Quandl.getData(req.body.stock, req.body.startDate, req.body.endDate, function(data){
    clog("QUANDL TOPPP");
    clog(data);
    clog("QUANDL BOTTOM");
    res.json(data);
  })
});



http.createServer(app).listen(app.get('port'), function(){
  clog('Express server listening on port ' + app.get('port') );
})
