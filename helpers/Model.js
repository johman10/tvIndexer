const ErrorHandler = require('ErrorHandler');
const db = require('server/Database');
const request = require('request');
const fs = require('fs-extra');
const path = require('path');

class Model {
  constructor (tableName) {
    this.table = db[tableName];
  }

  all () {
    return new Promise((resolve, reject) => {
      this.table.find({}, (error, docs) => {
        if (error) { return reject(error); }
        resolve(docs);
      });
    });
  }

  find (key, value) {
    return new Promise((resolve, reject) => {
      var query = {};
      query[key] = value;
      this.table.findOne(query, (error, doc) => {
        if (error) { return reject(error); }
        resolve(doc);
      });
    });
  }

  where (key, value) {
    return new Promise((resolve, reject) => {
      var query = {};
      query[key] = value;
      this.table.find(query, (error, docs) => {
        if (error) { return reject(error); }
        resolve(docs);
      });
    });
  }

  create (object) {
    return this.validations(object)
      .then((validationResults) => {
        if (!(validationResults.includes(false))) {
          return this.insert(object);
        }
      }).catch(ErrorHandler.throw);
  }

  validateUniqueness (key, value) {
    return this.where(value, key)
      .then((result) => {
        if (result.length == 0) {
          return true;
        } else {
          return result[0].id;
        }
      }).catch(ErrorHandler.throw);
  }

  validatePresence (value) {
    return value !== undefined || value !== null;
  }

  imageFromUrl (movieId, imageType, imageUrl) {
    return new Promise((resolve, reject) => {
      request.get({
        url: imageUrl,
        encoding: null
      }, (error, response, body) => {
        if (error) { return reject(error); }

        var imageDirectory = path.join(process.cwd(), 'db/images', String(movieId));
        var imageExtension = path.extname(imageUrl);
        var fileName = imageType + imageExtension;
        var filePath = path.join(imageDirectory, fileName);

        fs.ensureDir(imageDirectory, function (error) {
          if (error) { return reject(error); }

          fs.writeFile(filePath, body, 'binary', function(error) {
            if (error) { return reject(error); }
            resolve(filePath);
          });
        });
      });
    });
  }

  insert (record) {
    return new Promise((resolve, reject) => {
      this.table.insert(record, function(error, newRecord) {
        if (error) { return reject(error); }
        resolve(newRecord);
      });
    });
  }

  remove (key, value, options) {
    return new Promise((resolve, reject) => {
      var query = {};
      query[key] = value;
      options = options ? options : {};
      this.table.remove(query, options, (error, numRemoved) => {
        if (error) { return reject(error); }
        resolve(numRemoved);
      });
    });
  }
}

module.exports = Model;
