import RLSDB from 'rlsdb';
import TmdbModel from 'models/modules/tmdb-model';
import movieRecord from 'test/data/movie/record';
import searchResponse from 'test/data/movie/search-response';
let exampleInstance;

class Example extends TmdbModel {
  constructor(record = {}, apiResponse = {}) {
    super(record, apiResponse);
  }
}

describe('TmdbModel', () => {
  beforeEach(() => {
    exampleInstance = new Example(movieRecord, searchResponse);
  });

  it('extends RLSDB', () => {
    expect(TmdbModel.prototype instanceof RLSDB).to.be.true;
  });

  describe('constructor', () => {
    it('accepts an API response', () => {
      expect(exampleInstance.apiResponse.results).to.exist;
      expect(exampleInstance.apiResponse.results.length).to.equal(searchResponse.results.length);
    });
  });

  describe('instance method', () => {
    describe('saveFirstResult', () => {
      let saveResult;

      beforeEach(() => {
        localStorage.clear();
        saveResult = exampleInstance.saveFirstResult();
      });

      it('can safe the first API result', () => {
        expect(exampleInstance.saved).to.be.true;
        expect(localStorage[`examples${exampleInstance.id}`]).to.exist;
      });

      it('returns a the right instance after saving', () => {
        expect(saveResult.constructor).to.equal(Example);
      });
    });
  });
});
