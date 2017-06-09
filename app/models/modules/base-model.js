export default class BaseModel {
  constructor (record = {}) {
    this.record = record;
    this._assignRecordKeys();
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
    const storageKey = this._getLocalStorageKey(id);
    return this._stringToRecord(localStorage[storageKey]);
  }

  save () {
    const record = this._buildRecord(true);
    localStorage[this._getLocalStorageKey(record.id)] = JSON.stringify(record);
    localStorage[`${this.tableName}HighestId`] = record.id;
    this.record = record;
    this._assignRecordKeys();
    return this;
  }

  _assignRecordKeys () {
    const recordKeys = Object.keys(this.record);
    recordKeys.forEach((recordKey) => {
      if (!this.hasOwnProperty(recordKey)) {
        Object.defineProperty(this, recordKey, { get: function() { return this.record[recordKey]; } });
      }
    });
  }

  _getRecordId (offset = 0) {
    if (this.id) return this.id;
    const highestId = Number(localStorage[`${this.tableName}HighestId`] || 0) + offset;
    const recordId = highestId + 1;
    if (localStorage[`${this.tableName}${recordId}`]) return this._getRecordId(offset + 1);
    return recordId;
  }

  static _stringToRecord (string) {
    if (string) {
      const json = JSON.parse(string);
      return new this(json);
    }
  }

  _getLocalStorageKey (id) {
    return BaseModel._getLocalStorageKey.call(this, id);
  }

  static _getLocalStorageKey (id) {
    let tableName = this.tableName ? this.tableName : new this().tableName;
    return `${tableName}${id}`;
  }
}
