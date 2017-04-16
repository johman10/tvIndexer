const Movie = require('Movie');

class Socket {
  constructor (expressApp) {
    const server = require('http').Server(expressApp);
    const room = require('socket.io')(server);
    const movieInstance = new Movie(room);

    server.listen(3000);

    room.on('connection', function(socket) {
      socket.on('startSync', function(type) {
        if (type === 'movie' || type === 'all') {
          movieInstance.sync();
        }
      });
    });

    expressApp.use(function(req, res, next){
      res.socketRoom = room;
      next();
    });
  }
}

module.exports = Socket;
