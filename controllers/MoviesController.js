const Movie = require('Movie');
const ErrorHandler = require('ErrorHandler');
const {shell} = require('electron');

class MoviesController {
  constructor(request, response) {
    this.movieInstance = new Movie(response.socketRoom);
    this.request = request;
    this.response = response;
    this.errorInstance = new ErrorHandler(response.socketRoom, response);
  }

  index() {
    this.movieInstance.all()
      .then((results) => {
        this.response.render('movies/index', { movies: results });
      }).catch(this.errorInstance.redirect);
  }

  destroy() {
    var movieId = parseInt(this.request.params.movieId);
    this.movieInstance.removeFiles('id', movieId);
    this.movieInstance.remove('id', movieId);
    this.index();
  }

  show() {
    var movieId = parseInt(this.request.params.movieId);
    this.movieInstance.find('id', movieId)
      .then((movieResult) => {
        shell.openItem(movieResult.file_path);
      })
      .catch(this.errorInstance.redirect);
  }
}

module.exports = MoviesController;
