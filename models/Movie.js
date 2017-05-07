const Model = require('Model');
const Tmdb = require('Tmdb');
const fileHandler = require('fileHandler');
const ErrorHandler = require('ErrorHandler');
const path = require('path');
const fs = require('fs-extra');
const autoBind = require('auto-bind');
var TmdbItem = new Tmdb('83eb1bf692b23b1a308cf69600af3a4b');

class Movie extends Model {
  constructor (socketRoom) {
    super('movies');
    autoBind(this);
    this.errorInstance = new ErrorHandler(socketRoom);
  }

  validations (object) {
    var validationResults = [];
    validationResults.push(this.validatePresence(object.id));
    validationResults.push(this.validateUniqueness('id', object.id));
    return Promise.all(validationResults).catch(this.errorInstance.log);
  }

  sync () {
    var folderPath = '/Volumes/Movies';
    fileHandler.search(folderPath, /\(.avi|.mkv|.mp4\)$/)
    .then(fileHandler.parseData)
    .then(this.buildRecords)
    .then(this.createAll)
    .catch(this.errorInstance.log);
  }

  buildRecords (fileData) {
    let searchPromises = [];

    // Search for the movies based on the fileData
    fileData.forEach((fileInfo) => {
      searchPromises.push(TmdbItem.findMovie(fileInfo.title, { fileInfo }));
    });

    // After all promises, return the records
    return Promise.all(searchPromises).then((records) => {
      return new RecordList(records);
    });
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
