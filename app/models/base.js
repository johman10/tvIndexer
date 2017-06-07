export default class BaseModel {
  constructor () {
  }

  static findAll () {
    const tableName = new this().tableName;
    const storageKeys = Object.keys(localStorage).filter((key) => key.startsWith(tableName));
    const records = [];
    storageKeys.forEach((storageKey) => {
      records.push(this._stringToRecord(localStorage[storageKey]));
    });
    return records;
  }

  static find (id) {
    const storageKey = this._localStorageKey(id);
    return this._stringToRecord(localStorage[storageKey]);
  }

  saveFirstResult (customData) {
    if (!this.searchResults.length) {
      throw new Error('Implementation error, searchResults missing on model');
    }
    Object.assign(this.record, this.searchResults[0]);
    this.save(customData);
  }

  save (customData = {}) {
    const record = Object.assign({}, this.record, customData, { saved: true });
    const highestId = Number(localStorage[`${this.tableName}HighestId`]);
    const recordId = highestId + 1;
    localStorage[this._localStorageKey(recordId)] = JSON.stringify(record);
    localStorage[`${this.tableName}HighestId`] = recordId;
    this.record = record;
    return record;
  }

  _stringToRecord(string) {
    return BaseModel._stringToRecord(string);
  }

  static _stringToRecord(string) {
    const json = JSON.parse(string);
    return new this(json);
  }

  _localStorageKey (id) {
    return  BaseModel._localStorageKey(id);
  }

  static _localStorageKey (id) {
    let tableName = this.tableName ? this.tableName : new this().tableName;
    return `${tableName}${id}`;
  }
}
