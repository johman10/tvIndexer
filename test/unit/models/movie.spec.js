import Movie from 'models/movie';
import movieRecord from 'test/data/movie/record';
import movieSearchResponse from 'test/data/movie/search-response';
let movie;

describe('Movie', () => {
  beforeEach(() => {
    movie = new Movie(movieRecord, movieSearchResponse);
  });

  describe('constructor', () => {
    it('sets a tableName', () => {
      expect(movie.tableName).to.equal('movies');
    });
  });

  describe('saveFirstResult', () => {
    it('can safe the first API result', () => {
      movie.saveFirstResult();
      expect(movie.saved).to.be.true;
      expect(localStorage[`movies${movie.id}`]).to.exist;
    });

    it('returns a Movie instance after saving the first result', () => {
      movie.saveFirstResult();
      expect(movie.saved).to.be.true;
      expect(localStorage[`movies${movie.id}`]).to.exist;
    });
  });
});
