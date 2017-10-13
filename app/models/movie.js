import TmdbModel from 'models/modules/tmdb-model';

export default class Movie extends TmdbModel {
  constructor (record = {}, apiResponse = {}) {
    super(record, apiResponse);
  }

  get validations () {
    return {
      required: 'tmdbData',
      unique: 'tmdbData.id'
    };
  }

  get tmdbUrl () {
    const host = 'https://www.themoviedb.org/movie/';
    return host + this.tmdbData.id;
  }
}
