import notificationHandler from './notificationHandler';
const socket = window.io('//' + document.location.hostname + ':' + document.location.port);

socket.on('logError', (errorMessage) => {
  notificationHandler.error(errorMessage);
});

export function startSync (type = 'all') {
  socket.emit('startSync', type);
}
