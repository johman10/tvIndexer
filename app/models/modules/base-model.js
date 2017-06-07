import pluralize from 'pluralize';

export default class BaseModel {
  constructor (tableName = '', record = {}) {
    if (arguments.length === 1) {
      record = tableName;
      tableName = undefined;
    }

    if (!tableName) {
      throw new Error('You have to set `this.tableName` in the constructor of the extended class');
    }

    this.tableName = tableName;
    this.record = record;
    this._assignRecordKeys();
  }

  get _localStorageLastIdKey () {
    return `${this.tableName}LastId`;
  }

  _buildRecord (saved = false) {
    return {
      id: this._getRecordId(),
      ...this.record,
      saved
    };
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

  static findBy (key, value) {
    return this.findAll().find(this._keyValueFilter.bind(this, key, value));
  }

  static where (key, value) {
    return this.findAll().filter(this._keyValueFilter.bind(this, key, value));
  }

  static find (id) {
    const storageKey = this._getLocalStorageRecordKey(id);
    return this._stringToRecord(localStorage[storageKey]);
  }

  // getRelation('hasOne', 'movie');
  // getRelation('hasMany', 'movies');
  // getRelation('belongsTo', 'movie');
  // getRelation('belongsToMany', 'movies');
  getRelation (type, relationKey) {
    const singularRelationKey = pluralize.singular(relationKey);
    const relationClass = require(`models/${singularRelationKey}`).default;
    let singularResult;
    let pluralRelationKey;
    let pluralResult;
    let relation;

    switch(type) {
    case 'hasOne':
      relation = this.record[relationKey];
      return relationClass.find(relation);
    case 'hasMany':
      relation = this.record[relationKey];
      return relation.map(id => relationClass.find(id));
    case 'belongsTo':
      pluralRelationKey = pluralize.plural(relationKey);
      singularResult = relationClass.findBy(singularRelationKey, this.record.id);
      pluralResult = relationClass.findBy(pluralRelationKey, this.record.id);
      return singularResult || pluralResult;
    case 'belongsToMany':
      pluralRelationKey = pluralize.plural(relationKey);
      singularResult = relationClass.where(singularRelationKey, this.record.id);
      pluralResult = relationClass.where(pluralRelationKey, this.record.id);
      return singularResult.concat(pluralResult);
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

  static _keyValueFilter (key, value, record) {
    let requestedRecordValue = record[key];
    if (Array.isArray(requestedRecordValue)) {
      return requestedRecordValue.includes(value);
    } else {
      return requestedRecordValue === value;
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
