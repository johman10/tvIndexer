import TmdbModel from 'models/modules/tmdb-model';

export default class Movie extends TmdbModel {
  constructor (record = {}, apiResponse = {}) {
    super('movies', record, apiResponse);
  }
}

Movie.searchPath = '/search/movie';
