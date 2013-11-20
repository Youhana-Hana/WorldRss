var express = require('express'),
    path = require('path'),
    routes = require('./routes/routes.js'),
    logger = require('./lib/logger.js');

var app = express();

app.configure= function() {
    logger.verbose("app.configure");

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use(express.compress());
    app.use(express.static(path.join(__dirname, 'pubic')));
    app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    routes.get(app);
  };

module.exports = app;

