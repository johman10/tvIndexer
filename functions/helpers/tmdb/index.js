const requestHelper = require('./request-helper');

module.exports = {
  movie: {
    search (query, page = 1) {
      const params = { query, page };
      return requestHelper.performRequest('get', '/search/movie', { params })
        .then(results => {
          return results.data;
        });
    }
  }
};
