import { startSync } from './socketEvents';

document.querySelector('.sync-url').addEventListener('click', () => {
  startSync('all');
});
