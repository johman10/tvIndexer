var routes, mainRoutes;
var movieRoutes = require('./movie-routes');
var assetRoutes = require('./asset-routes');

mainRoutes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, response) {
      response.view('dashboard');
    }
  }
];

routes = mainRoutes.concat(movieRoutes, assetRoutes);

module.exports = routes;
