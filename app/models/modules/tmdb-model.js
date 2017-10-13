import RLSDB from 'rlsdb';

export default class TmdbModel extends RLSDB {
  constructor (record = {}, apiResponse = {}) {
    super(record);
    this.apiResponse = apiResponse;
  }

  posterUrl (width = 185) {
    if (Number.isInteger(width)) {
      width = 'w' + width;
    }

    const validWidths = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];
    if (!validWidths.includes(width)) throw new Error(`Invalid width defined, allowed value: ${validWidths}`);
    if (!this.record.tmdbData || !this.record.tmdbData.poster_path) return;

    return `http://image.tmdb.org/t/p/${width}${this.record.tmdbData.poster_path}`;
  }

  saveFirstResult () {
    if (!this.record.tmdbData) {
      this.record.tmdbData = {};
    }

    // TODO: Maybe do a GET request for the movie to make it contain more data
    // https://developers.themoviedb.org/3/movies
    if (this.apiResponse.results[0]) {
      const existingRecord = this.constructor.findBy('tmdbData.id', this.apiResponse.results[0].id);
      if (existingRecord) return existingRecord;

      Object.assign(this.record.tmdbData, this.apiResponse.results[0]);
      this.save();
    }
    return this;
  }
}
