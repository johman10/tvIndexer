import pluralize from 'pluralize';

export default class BaseModel {
  constructor (record = {}) {
    this.record = record;
    this._assignRecordKeys();
  }

  get _localStorageLastIdKey () {
    return `${this.tableName}LastId`;
  }

  static findAll (key, value) {
    const tableName = new this().tableName;
    const storageKeys = Object.keys(localStorage).filter((key) => key.startsWith(tableName));
    let records = storageKeys.map(storageKey => this._stringToRecord(localStorage[storageKey]));
    if (key && value) {
      records = records.filter(instance => instance.record[key] === value);
    }
    return records;
  }

  static find (id) {
    const storageKey = this._getLocalStorageRecordKey(id);
    return this._stringToRecord(localStorage[storageKey]);
  }

  getRelation (relationName) {
    const singularRelationName = pluralize.singular(relationName);
    const pluralRelationName = pluralize.plural(relationName);
    const relationClass = require(`models/${singularRelationName}`).default;
    const relation = this.record[singularRelationName] || this.record[pluralRelationName];
    if (typeof relation === 'number') {
      // Has one relation
      return relationClass.find(relation);
    } else if (relation.constructor === Array) {
      // Has many relation
      return relation.map(id => relationClass.find(id));
    } else if (!relation) {
      // Belongs to relation
      return relationClass.findAll('id', this.record.id);
    }
  }

  save () {
    const record = this._buildRecord(true);
    localStorage[this._getLocalStorageRecordKey(record.id)] = JSON.stringify(record);
    localStorage[this._localStorageLastIdKey] = record.id;
    this.record = record;
    this._assignRecordKeys();
    return this;
  }

  _assignRecordKeys () {
    if (this.record.constructor !== Object) return;

    const recordKeys = Object.keys(this.record);
    recordKeys.forEach((recordKey) => {
      if (!this.hasOwnProperty(recordKey)) {
        Object.defineProperty(this, recordKey, { get: function() { return this.record[recordKey]; } });
      }
    });
  }

  _getCurrentLastId () {
    const tableKeys = Object.keys(localStorage).filter(key => key.startsWith(this.tableName));
    const currentIds = tableKeys.map(key => parseInt(key.replace(this.tableName, '')));
    const currentLastId = currentIds.sort((a, b) => a < b)[0];
    return currentLastId;
  }

  _getRecordId (offset = 0) {
    if (this.id) return this.id;
    const LastId = Number(localStorage[this._localStorageLastIdKey] || 0) + offset;

    // If LastId is 0 ensure that there is no reference in localStorage to any ID
    // if there is a record start again with that ID as offset
    if (!LastId) {
      const currentLastId = this._getCurrentLastId();
      if (currentLastId) {
        return this._getRecordId(currentLastId);
      }
    }

    const recordId = LastId + 1;

    // If there is already an ID with the ID is going to be returned, try again
    // localStorage[`${this.tableName}${recordId}`]
    if (localStorage[this._getLocalStorageRecordKey(recordId)]) {
      return this._getRecordId(offset + 1);
    }

    return recordId;
  }

  static _stringToRecord (string) {
    if (string) {
      const json = JSON.parse(string);
      return new this(json);
    }
  }

  _getLocalStorageRecordKey (id) {
    return BaseModel._getLocalStorageRecordKey.call(this, id);
  }

  static _getLocalStorageRecordKey (id) {
    let tableName = this.tableName ? this.tableName : new this().tableName;
    if (!tableName) {
      throw new Error('Implementation error, tableName missing on parent class');
    }
    return `${tableName}${id}`;
  }
}
