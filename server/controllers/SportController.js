var restful = require('node-restful');
module.exports = function(app, route) {

  // Setup the controller for REST.
  var rest = restful.model(
    'sport',
    app.models.sport
  ).methods(['get', 'put', 'post', 'delete']);

  // Register this endpoint with the application.
  rest.register(app, route);

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
/** module.exports = function(app, route){
  var query={};
  if(app.query.m2) {
    query['name']=new RegExp(app.query.m2);//模糊查询参数
  }

  Movie.findByName (query,function(err, list){
    return res.render('/sport', {sportList:list});
  });
}; **/
