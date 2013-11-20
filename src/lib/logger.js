var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true, colorize: true }),
    new winston.transports.File({ filename: __dirname + '/rss.log',
                                  json: false, maxsize: 1000000, maxFiles: 1 })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true, colorize: true }),
    new winston.transports.File({ filename: __dirname + '/exceptions.log',
                                  json: false, maxsize: 1000000, maxFiles: 1  })
  ],

  exitOnError: false

});

module.exports = logger;
