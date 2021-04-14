// import tmdbHelper from 'helpers/tmdb';
//
// class File {
//   constructor () {
//   }
//
//   get fullPath () {
//     return `${this.dir}/${this.base}`;
//   }
//
//   async buildMovie () {
//     const searchTerm = this.torrentInfo ? this.torrentInfo.title : this.name;
//     const movie = await tmdbHelper.movie.search(searchTerm);
//     return movie;
//   }
// }
//
// export default File;

import { currentUserDoc } from 'models/user';
export default currentUserDoc.collection('files');
