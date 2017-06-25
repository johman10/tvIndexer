import BaseModel from 'models/modules/base-model';

export default class TmdbModel extends BaseModel {
  constructor (tableName = '', record = { tmdbData: {} }, apiResponse = {}) {
    super(tableName, record);
    this.apiResponse = apiResponse;
  }

  saveFirstResult () {
    if (!this.tmdbData) {
      this.record.tmdbData = {};
    }
    Object.assign(this.record.tmdbData, this.apiResponse.results[0]);
    this.save();
    return this;
  }
}
