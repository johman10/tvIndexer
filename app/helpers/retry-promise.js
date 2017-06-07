// Very strongly based on a library available here:
// https://github.com/olalonde/retry-promise

const retry = (getPromise) => {
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
};

export default retry;
