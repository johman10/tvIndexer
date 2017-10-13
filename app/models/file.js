import RLSDB from 'rlsdb';
import tmdbHelper from 'helpers/tmdb';

class File extends RLSDB {
  constructor (record) {
    super(record);
  }

  get validations () {
    return {
      unique: 'torrentInfo.title',
      required: 'torrentInfo'
    };
  }

  get fullPath () {
    return `${this.dir}/${this.base}`;
  }

  async buildMovie () {
    const searchTerm = this.torrentInfo ? this.torrentInfo.title : this.name;
    const movie = await tmdbHelper.movie.search(searchTerm);
    return movie;
  }
}

export default File;
