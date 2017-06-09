import TmdbModel from 'models/modules/tmdb-model';

export default class Movie extends TmdbModel {
  constructor (record = {}, apiResponse = {}) {
    super(record, apiResponse);
    this.tableName = 'movies';
  }
}

Movie.searchPath = '/search/movie';
