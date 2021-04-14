// import TmdbModel from 'models/modules/tmdb-model';
//
// export default class Movie extends TmdbModel {
//   constructor (record = {}, apiResponse = {}) {
//     super(record, apiResponse);
//   }
//
//   get tmdbUrl () {
//     const host = 'https://www.themoviedb.org/movie/';
//     return host + this.tmdbData.id;
//   }
// }
import { getUser } from 'helpers/user-helper';
import { fDb } from 'config/renderer/firebase';
export default fDb.collection('movies').where('createdBy', '==', getUser());
