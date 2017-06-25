import tmdbHelper from 'helpers/tmdb';
import Movie from 'models/movie';

describe('tmdb-helper.movie', () => {
  describe('search', () => {
    let moviePromise;

    before(() => {
      moviePromise = tmdbHelper.movie.search('test');
    });

    it('returns a promise', () => {
      expect(moviePromise).to.be.an.instanceof(Promise);
    });

    it('resolves to a Movie', () => {
      return moviePromise.then((movie) => {
        expect(movie).to.be.an.instanceof(Movie);
      });
    });

    it('sets the apiResponse on the returned Movie', () => {
      return moviePromise.then((movie) => {
        expect(typeof movie.apiResponse.results[0].id).to.equal('number');
      });
    });
  });
});
