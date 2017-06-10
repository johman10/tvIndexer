import axios from 'axios';
const AXIOS_INSTANCE = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY
  }
});

const requestHelper = {
  performRequest (method, url, options) {
    return this.retryPromise(() => {
      return AXIOS_INSTANCE({
        method: method,
        url,
        ...options
      });
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
            const response = err.response;
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

export default requestHelper;
