var app = require('./app.js');

app.configure();

var port = app.get('port');

app.listen(port);

