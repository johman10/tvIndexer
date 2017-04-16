const Model = require('Model');
const Tmdb = require('Tmdb');
const FindFile = require('FindFile');
const ErrorHandler = require('ErrorHandler');
const path = require('path');
const fs = require('fs-extra');
var TmdbItem = new Tmdb('83eb1bf692b23b1a308cf69600af3a4b');

class Movie extends Model {
  constructor (socketRoom) {
    super('movies');
    this.errorInstance = new ErrorHandler(socketRoom);
  }

  validations (object) {
    var validationResults = [];
    validationResults.push(this.validatePresence(object.id));
    validationResults.push(this.validateUniqueness('id', object.id));
    return Promise.all(validationResults).catch(this.errorInstance);
  }

  sync () {
    var folderPath = '/Volumes/Movies';
    new FindFile(folderPath, /\(.avi|.mkv|.mp4\)$/)
      .then((result) => {
        console.log(result);
      })
      .catch(this.errorInstance.log.bind(this.errorInstance));
  }

  removeFiles (key, value) {
    // TODO: this is assuming there are no double records;
    return this.find(key, value)
      .then((record) => {
        var fileFolder = path.join(process.cwd(), 'db/images', String(record.id));
        fs.removeSync(fileFolder);
      })
      .catch(this.errorInstance.throw);
  }
}

module.exports = Movie;
