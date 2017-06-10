import BaseModel from 'models/modules/base-model';

class File extends BaseModel {
  constructor (record) {
    super(record);
    this.tableName = 'files';
  }

  _buildRecord (saved) {
    return {
      id: this._getRecordId(),
      movie: this.record.movie,
      fileData: this.record.fileData,
      saved
    };
  }
}

export default File;
