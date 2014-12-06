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


//config
app.set('port', process.env.PORT || 3000);
app.use( morgan('dev') );
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use( methodOverride() );
app.use( express.static(path.join(__dirname, '/client')) );



//api routes
//Purpose:
app.get('/api/twitter-count/:twitter-query', function(req,res){
  var params = req.params.twitter-query;
  Twitter.getData(params.stock, params.startDate, params.endDate, function(data){
    req.json(data);
  })
})




http.createServer(app).listen(app.get('port'), function(){
  clog('Express server listening on port ' + app.get('port') );
})
