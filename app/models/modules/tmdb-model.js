import BaseModel from 'models/modules/base-model';

export default class TmdbModel extends BaseModel {
  constructor (record = {}, apiResponse = {}) {
    super(record);
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

  _buildRecord (saved = false) {
    const id = this._getRecordId();
    const tmdbData = Object.assign({}, this.record.tmdbData);
    return {
      id,
      tmdbData,
      saved
    };
  }
}
