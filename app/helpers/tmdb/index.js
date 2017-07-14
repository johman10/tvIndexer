import requestHelper from 'helpers/tmdb/request-helper';
import Movie from 'models/movie';

export default {
  movie: {
    async search (query, page = 1) {
      const params = { query, page };
      const results = await requestHelper.performRequest('get', '/search/movie', { params });
      return new Movie({}, results.data);
    },
    getUrl (movieId) {
      const host = 'https://www.themoviedb.org/movie/';
      return host + movieId;
    }
  },

  poster: {
    urlFromPath (path, width = 185) {
      if (Number.isInteger(width)) {
        width = 'w' + width;
      }

      const validWidths = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];
      if (!validWidths.includes(width)) throw new Error(`Invalid width defined, allowed value: ${validWidths}`);
      if (!path) return;

      return `http://image.tmdb.org/t/p/${width}${path}`;
    }
  }
};
