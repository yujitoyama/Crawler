
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/action/login')
  , adduser = require('./routes/action/adduser')
  , showuser = require('./routes/action/showuser')
  , python = require('./routes/python/py1')
  , user = require('./routes/user')
  , http = require('http')
  , mysql = require('mysql')
  , session = require('express-session')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('secret','mycom_sercred_key'));
app.use(express.session({key:'session_id'}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/login', login.login);
app.post('/addusersc', adduser.addusersc);
app.post('/adduser', adduser.adduser);
app.post('/showuser', showuser.showuser);
app.post('/py1', python.callpy1);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
