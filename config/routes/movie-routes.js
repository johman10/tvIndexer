var MoviesController = require('MoviesController');
var express = require('express');
var router = express.Router();
var moviesControllerInstance;


router.use(function timeLog (request, response, next) {
  moviesControllerInstance = new MoviesController(request, response);
  next();
});

router.route('/')
  .get(function () {
    moviesControllerInstance.index();
  })
  .post(function () {
    moviesControllerInstance.create();
  });

router.get('/sync', function () {
  moviesControllerInstance.sync();
});

router.get('/:movieId/destroy', function () {
  moviesControllerInstance.destroy();
});

router.get('/:movieId', function () {
  moviesControllerInstance.show();
});

module.exports = router;
