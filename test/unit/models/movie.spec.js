import Movie from 'models/movie';
import TmdbModel from 'models/modules/tmdb-model';
import movieRecord from 'test/data/movie/record';
import movieSearchResponse from 'test/data/movie/search-response';
let movie;

describe('Movie', () => {
  beforeEach(() => {
    movie = new Movie(movieRecord, movieSearchResponse);
  });

  it('extends TmdbModel', () => {
    expect(Movie.prototype instanceof TmdbModel).to.be.true;
  });

  describe('constructor', () => {
    it('sets a tableName', () => {
      expect(movie.tableName).to.equal('movies');
    });
  });
});
