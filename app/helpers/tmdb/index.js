import requestHelper from 'helpers/tmdb/request-helper';
import Movie from 'models/movie';

export default {
  movie: {
    async search (query, page = 1) {
      const params = { query, page };
      const results = await requestHelper.performRequest('get', '/search/movie', { params });
      return new Movie({}, results.data);
    }
  }
};
