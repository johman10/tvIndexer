import BaseModel from 'models/modules/base-model';
import Movie from 'models/movie';
import movieRecord from 'test/data/movie/record';

class Example extends BaseModel {
  constructor(record = {}) {
    super('examples', record);
  }

  _buildRecord () {
    return {
      id: 1
    };
  }
}

class ExampleWithoutBuildRecord extends BaseModel {
  constructor(record = {}) {
    super('examples', record);
  }
}

class WrongExample extends BaseModel {
  constructor(record = {}) {
    super(record);
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

    it('throws an error when there is no tableName in the extended class', () => {
      expect(WrongExample).to.throw();
    });

    it('adds getters for the record if record is an object', () => {
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
          expect(result).to.be.an.instanceof(Example);
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

    // TODO: Write specs
    describe('findBy', () => {
      it('should return only one record');

      it('should only return a record with matching key value');
    });

    // TODO: Write specs
    describe('where', () => {
      it('should return multiple records');

      it('should only return records with matching key value');

      it('returns an empty record when there is no result');
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

      it('has the option to filter results', () => {
        const customRecord = JSON.stringify({ test: 'test' });
        localStorage.examples1 = customRecord;
        localStorage.examples2 = customRecord;
        result = Example.findAll('test', 'test');
        expect(result.length).to.equal(2);
        expect(result[0].record.test).to.equal('test');
        expect(result[1].record.test).to.equal('test');
      });
    });

    describe('_stringToRecord', () => {
      beforeEach(() => {
        const stringRecord = JSON.stringify(movieRecord);
        result = Example._stringToRecord(stringRecord);
      });

      it('returns an instance of the correct constructor', () => {
        expect(result).to.be.an.instanceof(Example);
      });
    });

  });

  describe('instance method', () => {
    beforeEach(() => {
      exampleInstance = new Example(Object.assign({}, movieRecord));
    });

    describe('getRelation', () => {
      it('is able to handle an has one relation', () => {
        localStorage.clear();
        exampleInstance.record.movie = movieRecord.id;
        localStorage[`movies${movieRecord.id}`] = JSON.stringify(movieRecord);
        const relationData = exampleInstance.getRelation('hasOne', 'movie');
        expect(relationData).to.be.an.instanceof(Movie);
      });

      it('is able to handle an has many relation', () => {
        localStorage.clear();
        exampleInstance.record.movies = [movieRecord.id, 4];
        localStorage[`movies${movieRecord.id}`] = JSON.stringify(movieRecord);
        localStorage['movies4'] = JSON.stringify(movieRecord);
        const relationData = exampleInstance.getRelation('hasMany', 'movies');
        expect(relationData).to.be.an.instanceof(Array);
        expect(relationData[0]).to.be.an.instanceof(Movie);
        expect(relationData[1]).to.be.an.instanceof(Movie);
      });

      it('is able to handle a belongs to relation', () => {
        localStorage.clear();
        exampleInstance.save();
        const newRecord = Object.assign({}, movieRecord);
        newRecord.movie = exampleInstance.id;
        localStorage[`movies${newRecord.id}`] = JSON.stringify(newRecord);
        const relationData = exampleInstance.getRelation('belongsTo', 'movie');
        expect(relationData).to.be.an.instanceof(Movie);
        expect(relationData.movie).to.equal(exampleInstance.id);
      });

      it('is able to handle an belongs to many relation', () => {
        let newRecord = Object.assign({}, movieRecord);
        localStorage.clear();
        exampleInstance.save();
        newRecord.movies = [exampleInstance.id];
        localStorage[`movies${newRecord.id}`] = JSON.stringify(newRecord);
        newRecord = Object.assign({}, movieRecord);
        newRecord.movie = exampleInstance.id;
        localStorage['movies4'] = JSON.stringify(newRecord);
        const relationData = exampleInstance.getRelation('belongsToMany', 'movies');
        expect(relationData).to.be.an.instanceof(Array);
        expect(relationData.length).to.equal(2);
        expect(relationData[0].movie).to.equal(exampleInstance.id);
        expect(relationData[1].movies[0]).to.equal(exampleInstance.id);
      });
    });

    describe('_buildRecord', () => {
      beforeEach(() => {
        localStorage.clear();
        exampleInstance = new ExampleWithoutBuildRecord({ test: 'value' });
      });

      it('has the method', () => {
        expect(exampleInstance._buildRecord).to.exist;
        expect(typeof exampleInstance._buildRecord).to.equal('function');
      });

      it('sets saved continually' , () => {
        expect(exampleInstance._buildRecord(true).saved).to.be.true;
        expect(exampleInstance._buildRecord(false).saved).to.be.false;
        expect(exampleInstance._buildRecord().saved).to.be.false;
      });

      it('sets the record ID', () => {
        expect(exampleInstance._buildRecord().id).to.equal(1);
      });

      it('sets other data', () => {
        expect(exampleInstance._buildRecord().test).to.equal('value');
      });
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
