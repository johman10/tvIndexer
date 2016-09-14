var MoviesController = require('MoviesController');
var movieRoutes;

movieRoutes = [
  {
    method: 'GET',
    path: '/movies',
    handler: function(request, response) {
      var moviesControllerInstance = new MoviesController(request, response);
      return moviesControllerInstance.index();
    }
  },
  {
    method: 'POST',
    path: '/movies',
    handler: function(request, response) {
      var moviesControllerInstance = new MoviesController(request, response)
      return moviesControllerInstance.create();
    }
  },
  {
    method: 'GET',
    path: '/movies/sync',
    handler: function(request, response) {
      var moviesControllerInstance = new MoviesController(request, response)
      return moviesControllerInstance.sync();
    }
  },
  {
    method: 'GET',
    path: '/movies/{movieId}/destroy',
    handler: function(request, response) {
      var moviesControllerInstance = new MoviesController(request, response)
      return moviesControllerInstance.destroy();
    }
  },
  {
    method: 'GET',
    path: '/movies/{movieId}/open',
    handler: function(request, response) {
      var moviesControllerInstance = new MoviesController(request, response)
      return moviesControllerInstance.open();
    }
  }
];

module.exports = movieRoutes;
