const Movie = require('Movie');
const ErrorHandler = require('ErrorHandler');
const {shell} = require('electron');

class MoviesController {
  constructor(request, response, next) {
    this.movieInstance = new Movie();
    this.request = request;
    this.response = response;
  }

  index() {
    this.movieInstance.all()
      .then((results) => {
        this.response.render('movies/index', { movies: results });
      }, new ErrorHandler(this.response).redirect);
  }

  create() {
    this.movieInstance.insert({test: 'hallo'})
      .then(() => {
        this.index();
      }, new ErrorHandler(this.response).redirect);
  }

  sync() {
    this.movieInstance.sync();
    this.response.redirect('/');
  }

  destroy() {
    var movieId = parseInt(this.request.params.movieId);
    this.movieInstance.destroy(movieId);
    this.index();
  }

  show() {
    var movieId = parseInt(this.request.params.movieId);
    this.movieInstance.find(movieId).then((movieResult) => {
      shell.openItem(movieResult.file_path);
    }, new ErrorHandler(this.response).redirect);
  }
}

module.exports = MoviesController;
