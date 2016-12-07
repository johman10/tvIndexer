const Model = require('Model');
const Tmdb = require('Tmdb');
const FindFile = require('FindFile');
const ErrorHandler = require('ErrorHandler');
const ErrorHandlerInstance = new ErrorHandler();
const path = require('path');
var TmdbItem = new Tmdb('83eb1bf692b23b1a308cf69600af3a4b');

class Movie extends Model {
  constructor() {
    super('movies');
    this.errors = [];
    this.moviePromises = [];
  }

  validations(object) {
    var validationResults = [];
    validationResults.push(this.validatePresence(object.id));
    validationResults.push(this.validateUniqueness('id', object.id));
    return Promise.all(validationResults, ErrorHandlerInstance.log);
  }

  sync() {
    var folderPath = '/Volumes/Movies';
    new FindFile(folderPath, /\(.avi|.mkv|.mp4\)$/)
      .then(foundFiles => {
        var movieObjects = this.processFiles(foundFiles);
        this.findMovies(movieObjects);
      }, ErrorHandlerInstance.log);
  }

  findMovies(movieObjects) {
    var promises =
      movieObjects.map(movieObject => {
        return TmdbItem.searchMovie(movieObject.title)
          .then(this.buildRecord.bind(this, movieObject));
      });

    Promise.all(promises).then(this.insert, ErrorHandlerInstance.log);
  }

  buildRecord(movieObject, searchResult) {
    return new Promise((reject, resolve) => {
      var record = movieObject;
      var promises = [];

      if (searchResult.results.length > 0) {
        Object.assign(record, searchResult.results[0]);
        if (record.poster_path) {
          record.poster_url = 'http://image.tmdb.org/t/p/original' + record.poster_path;
          promises.push(this.imageFromUrl(record.poster_url));
        }
        if (record.backdrop_path) {
          record.backdrop_url = 'http://image.tmdb.org/t/p/original' + record.backdrop_path;
          promises.push(this.imageFromUrl(record.backdrop_url));
        }

        return Promise.all(promises)
          .then((results) => {
            if (results[0]) record.poster_image = results[0];
            if (results[1]) record.badrop_image = results[1];
            resolve(record);
          }, ErrorHandlerInstance.log);
      } else {
        delete record.title;
        resolve(record);
      }
    });
  }

  processFiles(filePaths) {
    var movieObjects = [];
    var fileExtension;
    filePaths.forEach((filePath) => {
      fileExtension = path.extname(filePath);
      movieObjects.push({
        folder_path: path.dirname(filePath),
        file_extension: fileExtension,
        file_path: filePath,
        title: path.basename(filePath, fileExtension)
      });
    });
    return movieObjects;
  }
}

module.exports = Movie;
