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

    it('can sets the constructor data correctly', () => {
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
  });

  describe('instance method', () => {
    beforeEach(() => {
      exampleInstance = new Example(movieRecord);
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
  });
});
