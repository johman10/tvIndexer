import BaseModel from 'models/modules/base-model';

class File extends BaseModel {
  constructor (record) {
    super(record);
    this.tableName = 'files';
  }

  _buildRecord (saved) {
    return {
      id: this._getRecordId(),
      ...this.record,
      saved
    };
  }
}

export default File;
