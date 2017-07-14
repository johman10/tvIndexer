import RLSDB from 'rlsdb';

export default class TmdbModel extends RLSDB {
  constructor (record = { tmdbData: {} }, apiResponse = {}) {
    super(record);
    this.apiResponse = apiResponse;
  }

  saveFirstResult () {
    if (!this.tmdbData) {
      this.record.tmdbData = {};
    }

    // TODO: Maybe do a GET request for the movie to make it contain more data
    // https://developers.themoviedb.org/3/movies
    if (this.apiResponse.results[0]) {
      const existingRecord = this.constructor.findBy('tmdbData.title', this.apiResponse.results[0].title);
      if (existingRecord) return existingRecord;

      Object.assign(this.record.tmdbData, this.apiResponse.results[0]);
      this.save();
    }
    return this;
  }
}
