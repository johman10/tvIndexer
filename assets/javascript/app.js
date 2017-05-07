import { startSync } from './socketEvents';

document.querySelector('.sync-url').addEventListener('click', (event) => {
  event.preventDefault();
  startSync('all');
});
