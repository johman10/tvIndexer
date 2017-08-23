import TmdbModel from 'models/modules/tmdb-model';

export default class Movie extends TmdbModel {
  constructor (record = {}, apiResponse = {}) {
    super(record, apiResponse);
  }

  get tmdbUrl () {
    const host = 'https://www.themoviedb.org/movie/';
    return host + this.tmdbData.id;
  }
}

Movie.searchPath = '/search/movie';
