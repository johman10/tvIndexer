import Movie from 'models/movie';
import TmdbModel from 'models/modules/tmdb-model';

describe('Movie', () => {
  it('extends TmdbModel', () => {
    expect(Movie.prototype).to.be.an.instanceof(TmdbModel);
  });
});
