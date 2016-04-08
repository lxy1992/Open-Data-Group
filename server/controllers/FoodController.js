var restful = require('node-restful');

module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, 'food', route, app.models.food).rest();

  // Register this endpoint with the application
  rest.register(app, route);

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
