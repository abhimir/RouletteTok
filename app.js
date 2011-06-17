var express = require('express');
var io = require('socket.io');

var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
	app.set('address', 'fierce-sword-182.herokuapp.com'); // Server address
	app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Development configuration
app.configure('development', function() {
	app.set('address', 'localhost');
  app.use(express.errorHandler({ 
		dumpExceptions: true, 
		showStack: true 
	})); 
});

// Routes
app.get('/', function(req, res) {
  res.render('index', {
		title: 'RouletteTok',
    address: app.settings.address,
		port: app.settings.port
  });
});

if (!module.parent) {
  app.listen(app.settings.port);
  console.log("Express server listening on port %d", app.settings.port);
}

// Start my Socket.io app and pass in the socket
require('./socketapp').start(io.listen(app));