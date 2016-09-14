const Movie = require('Movie');
const {shell} = require('electron');

class MoviesController {
  constructor(request, response) {
    this.dbConnection = request.server.db.connection;
    this.movieInstance = new Movie(this.dbConnection);
    this.request = request;
    this.response = response;
  }

  index() {
    this.movieInstance.all()
      .then((results) => {
        this.response.view('movies/index', { movies: results });
      })
      .catch((error) => {
        this.response.view('errors/500', { error: error });
      });
  }

  create() {
    this.movieInstance.insert({test: 'hallo'})
      .then(() => {
        this.index();
      })
      .catch((error) => {
        this.response.view('errors/500', { error: error });
      });
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

  open() {
    var movieId = parseInt(this.request.params.movieId);
    this.movieInstance.get(movieId).then((movieResult) => {
      shell.openItem(movieResult.file_path);
    });
  }
}

module.exports = MoviesController;
