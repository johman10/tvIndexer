import RLSDB from 'rlsdb';
import tmdbHelper from 'helpers/tmdb';

class File extends RLSDB {
  constructor (record) {
    super(record);
  }

  async buildMovie () {
    const searchTerm = this.torrentInfo ? this.torrentInfo.title : this.name;
    const movie = await tmdbHelper.movie.search(searchTerm);
    return movie;
  }
}

export default File;
