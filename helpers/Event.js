
class Event {
  constructor(server, options, next) {
    const io = require('socket.io')(server.listener);
    io.on('connection', function (socket) {

      console.log('New connection!');

      socket.on('hello', this.hello);
      // socket.on('newMessage', this.newMessage);
      // socket.on('goodbye', this.goodbye);
    });

    next();
  }

  hello() {
    console.log('socket hello');
  }
}

exports.register = Event;
exports.register.attributes = {
  name: 'eventSystem'
};
