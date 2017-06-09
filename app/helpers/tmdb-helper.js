import axios from 'axios';
import retryPromise from 'helpers/retry-promise';
import Movie from 'models/movie';
const AXIOS_INSTANCE = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY
  }
});

export default {
  searchMovie (query, page = 1) {
    const params = { query, page };
    return performRequest('get', '/search/movie', { params }).then((results) => {
      return new Movie({}, results.data);
    });
  }
};

function performRequest (method, url, options) {
  return retryPromise(() => {
    return AXIOS_INSTANCE({
      method: method,
      url,
      ...options
    });
  });
}
