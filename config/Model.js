const r = require('rethinkdb');
const ErrorHandler = require('ErrorHandler');

class Model {
  constructor(connection, tableName) {
    this.connection = connection;
    this.tableName = tableName;
    this.table = r.table(this.tableName);
  }

  all() {
    return this.table.run(this.connection).then(this.cursorToArray);
  }

  cursorToArray(cursor) {
    return cursor.toArray();
  }

  get(id) {
    return this.table.get(id).run(this.connection);
  }

  search(value, index) {
    return this.table.getAll(value, { index: index }).run(this.connection).then(this.cursorToArray);
  }

  merge(id, object) {
    var item = this.get(id);
    return item.merge(object);
  }

  create(objects) {
    this.validations(objects)
      .then((validationResults) => {
        var failedIds = validationResults.filter(elem => elem !== true);
        // Check for validation errors;
        if (failedIds.length > 0) {
          this.insert(objects);
        } else {
          failedIds.forEach(failedId => this.merge(failedId, object));
        }
      })
      .catch(new ErrorHandler);
  }

  validateUniqueness(index, value) {
    return this.search(value, index)
      .then((result) => {
        if (result.length == 0) {
          return true;
        } else {
          return result[0].id;
        }
      });
  }

  validatePresence(value) {
    if (value) {
      return true;
    } else {
      return false;
    }
  }

  insert(object) {
    console.log(object);
    return this.table.insert(object, { conflict: function(id, oldDoc, newDoc) {
      return newDoc.merge(oldDoc);
    }}).run(this.connection);
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
