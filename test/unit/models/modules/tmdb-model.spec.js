import TmdbModel from 'models/modules/tmdb-model';
import movieRecord from 'test/data/movie/record';
import searchResponse from 'test/data/movie/search-response';
let exampleInstance;

class Example extends TmdbModel {
  constructor(record = {}, apiResponse = {}) {
    super(record, apiResponse);
    this.tableName = 'examples';
  }
}

describe('TmdbModel', () => {
  beforeEach(() => {
    exampleInstance = new Example(movieRecord, searchResponse);
  });

  describe('constructor', () => {
    it('accepts an API response', () => {
      expect(exampleInstance.apiResponse.results).to.exist;
      expect(exampleInstance.apiResponse.results.length).to.equal(searchResponse.results.length);
    });
  });
});
