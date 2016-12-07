const Datastore = require('nedb');

var database = {
  movies: new Datastore({ filename: 'db/movies.db', autoload: true })
}

module.exports = database;
