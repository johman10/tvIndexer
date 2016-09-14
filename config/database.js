const r = require('rethinkdb');

function connectDb(server) {
  r.connect({db: 'tvIndexer', host: 'localhost', port: 28015}, function(error, connection) {
    if (error) {
      throw error;
    }

    // console.log(connection);

    server.db = {};
    server.db.connection = connection;
  });
}

module.exports = connectDb;
