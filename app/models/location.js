import BaseModel from 'models/modules/base-model';

export default class Location extends BaseModel {
  constructor (record = {}) {
    super('locations', record);
  }
}
