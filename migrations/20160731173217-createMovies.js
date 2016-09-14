exports.up = function (r, connection) {
  return r.tableCreate('movies', { primaryKey: 'id' }).run(connection);
};

exports.down = function (r, connection) {
  return r.tableDrop('movies').run(connection);
};
