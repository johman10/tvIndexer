import BaseModel from 'models/modules/base-model';

class File extends BaseModel {
  constructor (record) {
    super('files', record);
  }
}

export default File;
