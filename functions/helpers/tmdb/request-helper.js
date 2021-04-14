const functions = require('firebase-functions');
const axios = require('axios');
const AXIOS_INSTANCE = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: functions.config().tmdb.key
  }
});

module.exports = {
  performRequest (method, url, options) {
    return this.retryPromise(() => {
      return AXIOS_INSTANCE(Object.assign({
        method,
        url
      }, options));
    });
  },

  // Very strongly based on a library available here:
  // https://github.com/olalonde/retry-promise
  retryPromise (getPromise) {
    return new Promise((resolve, reject) => {
      const attempt = (i) => {
        getPromise(i)
          .then(resolve)
          .catch((err) => {
            if (i >= 5) {
              return reject(err);
            }
            console.error(err); // eslint-disable-line no-console
            const response = err.response;
            if (!response) return reject(err);
            const statusCode = response.status;
            if (statusCode === 429) {
              const retryAfter = parseInt(response.headers['retry-after']);
              setTimeout(() => attempt(i + 1), (retryAfter * 1000));
            } else {
              reject(err);
            }
          });
      };
      attempt(1);
    });
  }
};
