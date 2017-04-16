const handler = {
  error (errorMessage, time = 5000) {
    let element = buildNotificationElement('error');
    let body = document.querySelector('body');
    element.innerHTML = errorMessage;
    body.appendChild(element);

    setRemoveTimeout(element, time);
  }
};

// Remove element after timeout;
function setRemoveTimeout (element, time) {
  setTimeout(() => {
    document.querySelector('body').removeChild(element);
  }, time);
}

function buildNotificationElement (type) {
  let element = document.createElement('div');
  element.classList.add('notification', 'notification--' + type);
  return element;
}

export default handler;
