// new Notification(function(variable, test, test1) {
//   console.log(variable, test, test1);
// });
// const EventEmitter = require('events');
// const ee = new EventEmitter;
const En = new EventNotification;
// console.log(En);

En.on('infoNotification', () => {
  new Notification('Dashboard', 'infoNotification');
});
// notificationObject.setupEventListeners(function(variable, test, test1) {
//   console.log(variable, test, test1);
// });
