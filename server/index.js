var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
// used to create, sign, and verify tokens
var jwt    = require('jsonwebtoken'); 
var config = require('./config'); 

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.set('superSecret', config.secret); // secret variable


// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to MongoDB

mongoose.connect('mongodb://localhost/opendata');
mongoose.connection.once('open', function() {

  // Load the models. MVC Seperation
  app.models = require('./models/index');

  // Load the routes.
var routes = require('./routes');
_.each(routes, function(controller, route) {
  app.use(route, controller(app, route));
});

  console.log('Listening on port 3000...');
  app.listen(3000);
});
