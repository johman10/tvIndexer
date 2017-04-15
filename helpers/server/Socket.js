class Socket {
  constructor (expressApp) {
    const server = require('http').Server(expressApp);
    const io = require('socket.io')(server);

    server.listen(3000);

    expressApp.use(function(req, res, next){
      res.io = io;

      // res.io.on('connection', function() {
      //   console.log('user connected');
      // });

      next();
    });
  }
}

module.exports = Socket;
