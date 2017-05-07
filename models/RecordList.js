class RecordList extends Array {
  constructor (typeClass, ...args) {
    super(...args);
    this.typeClass = typeClass;
  }
}
