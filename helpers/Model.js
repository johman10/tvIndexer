const ErrorHandler = require('ErrorHandler');
const ErrorHandlerInstance = new ErrorHandler();
const db = require('server/Database');

class Model {
  constructor(tableName) {
    this.tableName = tableName;
    this.table = db[this.tableName];
  }

  all() {
    return new Promise((resolve, reject) => {
      this.table.find({}, (error, docs) => {
        ErrorHandlerInstance.throw(error);
        reject('hallo');
        resolve(docs);
      })
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      this.table.findOne({ id: id }, (error, doc) => {
        ErrorHandlerInstance.throw(error);
        resolve(doc);
      })
    });
  }

  search(key, value) {
    return new Promise((resolve, reject) => {
      var query = {}
      query[key] = value;
      this.table.find(query, (error, docs) => {
        ErrorHandlerInstance.throw(error);
        resolve(doc);
      });
    });
  }

  create(objects) {
    return this.validations(objects)
      .then((validationResults) => {
        var failedIds = validationResults.filter(elem => elem !== true);
        if (failedIds.length > 0) {
          return this.insert(objects);
        }
      }, ErrorHandlerInstance.throw);
  }

  validateUniqueness(key, value) {
    return this.search(value, key)
      .then((result) => {
        if (result.length == 0) {
          return true;
        } else {
          return result[0].id;
        }
      }, ErrorHandlerInstance.throw);
  }

  validatePresence(value) {
    if (value) {
      return true;
    } else {
      return false;
    }
  }

  create(object) {
    return this.table.insert(object).run(this.connection);
  }

  imageFromUrl(image_url) {
    return r.http(image_url, { result_format: 'binary' }).run(this.connection);
  }

  update(id, object) {
    return this.table.get(id).update(object).run(this.connection);
  }

  replace(id, object) {
    return this.table.get(id).replace(object).run(this.connection);
  }

  destroy(id) {
    return this.delete(id);
  }

  delete(id) {
    return this.table.get(id).delete().run(this.connection);
  }
}

module.exports = Model;
