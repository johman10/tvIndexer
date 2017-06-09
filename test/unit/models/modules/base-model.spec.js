import BaseModel from 'models/modules/base-model';
import movieRecord from 'test/data/movie/record';

class Example extends BaseModel {
  constructor(record = {}) {
    super(record);
    this.tableName = 'examples';
    this.triggeredBuildRecord = false;
  }

  _buildRecord () {
    return {
      id: 1
    };
  }
}

describe('BaseModel', () => {
  let exampleInstance;

  describe('constructor', () => {
    beforeEach(() => {
      exampleInstance = new Example(movieRecord);
    });

    it('can set the constructor data correctly', () => {
      expect(exampleInstance.record.id).to.equal(movieRecord.id);
    });

    it('adds getters for the record', () => {
      expect(exampleInstance.id).to.equal(movieRecord.id);
    });
  });

  describe('static method', () => {
    let result;

    describe('find', () => {
      beforeEach(() => {
        localStorage.clear();
        localStorage.examples1 = JSON.stringify(movieRecord);
      });

      describe('with an existing ID', () => {
        beforeEach(() => {
          result = Example.find(1);
        });

        it('returns an instance with the right constructor', () => {
          expect(result.constructor).to.equal(Example);
        });

        it('returns the right data', () => {
          expect(result.id).to.equal(movieRecord.id);
          expect(result.tmdbData.id).to.equal(movieRecord.tmdbData.id);
        });
      });

      describe('with an NOT existing ID', () => {
        it('returns undefined', () => {
          result = Example.find(2);
          expect(result).to.not.exist;
        });
      });
    });

    describe('findAll', () => {
      beforeEach(() => {
        localStorage.clear();
        localStorage.examples1 = JSON.stringify(movieRecord);
        localStorage.examples2 = JSON.stringify(movieRecord);
        localStorage.examples3 = JSON.stringify(movieRecord);
        localStorage.movies1 = JSON.stringify({ test: '1' });
        result = Example.findAll();
      });

      it('returns an array of all relevant items', () => {
        expect(result.length).to.equal(3);
      });

      it('returns an empty array if no items are found', () => {
        localStorage.clear();
        result = Example.findAll();
        expect(result.length).to.equal(0);
      });
    });

    describe('_stringToRecord', () => {
      beforeEach(() => {
        const stringRecord = JSON.stringify(movieRecord);
        result = Example._stringToRecord(stringRecord);
      });

      it('returns an instance of the correct constructor', () => {
        expect(result.constructor).to.equal(Example);
      });
    });

  });

  describe('instance method', () => {
    beforeEach(() => {
      exampleInstance = new Example(Object.assign({}, movieRecord));
    });

    describe('save', () => {
      let savedRecord;

      beforeEach(() => {
        localStorage.clear();
        savedRecord = exampleInstance.save();
      });

      it('saves the data in localStorage', () => {
        expect(localStorage[`examples${savedRecord.id}`]).to.exist;
      });

      it('saves the result of _buildRecord', () => {
        const buildRecordResult = new Example()._buildRecord();
        expect(savedRecord.id).to.equal(buildRecordResult.id);
      });

      it('returns an instance of the right constructor', () => {
        expect(savedRecord.constructor).to.equal(Example);
      });
    });

    describe('_getRecordId', () => {
      describe('when an ID is present on the record', () => {
        it('returns the same value as the ID', () => {
          expect(exampleInstance._getRecordId()).to.equal(exampleInstance.id);
        });
      });

      describe('when no ID is present on the record', () => {
        describe('when the lastId is set in localStorage', () => {
          let oldId;

          beforeEach(() => {
            localStorage.clear();
            localStorage.examplesLastId = 6;
            oldId = exampleInstance.record.id;
            delete exampleInstance.record.id;
          });

          it('returns a value that is one higher than the saved id', () => {
            expect(exampleInstance._getRecordId()).to.equal(7);
          });

          it('returns another value if the expected result already exists', () => {
            localStorage[`examples${oldId}`] = 'testing';
            localStorage.examplesLastId = oldId - 1;
            expect(exampleInstance._getRecordId()).to.equal(oldId + 1);

            localStorage[`examples${oldId + 1}`] = 'testing';
            localStorage.examplesLastId = oldId - 1;
            expect(exampleInstance._getRecordId()).to.equal(oldId + 2);
          });
        });

        describe('when the lastId is NOT set in localStorage', () => {
          it('returns 1 if no other records are present', () => {
            localStorage.clear();
            delete exampleInstance.record.id;
            expect(exampleInstance._getRecordId()).to.equal(1);
          });

          it('returns the last known value + 1 when other records are present', () => {
            localStorage.clear();
            localStorage.examples1 = 'testing';
            localStorage.examples3 = 'testing';
            localStorage.examples5 = 'testing';
            delete exampleInstance.record.id;

            expect(exampleInstance._getRecordId()).to.equal(6);
          });
        });
      });
    });
  });

  describe('_getLocalStorageRecordKey', () => {
    let result;

    beforeEach(() => {
      result = Example._getLocalStorageRecordKey(1);
    });

    it('returns a string', () => {
      expect(typeof result).to.equal('string');
    });

    it('returns the tableName plus the ID', () => {
      const tableName = new Example().tableName;
      expect(result).to.equal(`${tableName}1`);
    });

    it('also works as an instance method', () => {
      result = new Example()._getLocalStorageRecordKey(1);
      const tableName = new Example().tableName;
      expect(result).to.equal(`${tableName}1`);
    });
  });
});
