const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

const torrentNameParser = require('torrent-name-parser');
const tmdbHelper = require('./helpers/tmdb/index');

function getMovieNameFromFile (file) {
  const movieInfo = torrentNameParser(file.name);
  return movieInfo.title;
}

function createMovie (userId, movie) {
  // TODO: Maybe do a GET request for the movie to make it contain more data;
  // https://developers.themoviedb.org/3/movies;
  if (!movie) return;

  const movieCollection = firestore.collection(`users/${userId}/movies`);
  return movieCollection.where('id', '==', movie.id).get()
    .then(querySnapshot => {
      if (querySnapshot.empty)
        return movieCollection.add(movie);
      return querySnapshot.docs[0].ref;
    });
}

function uploadFile (tmdbId, imageUrl) {
  const bucket = admin.storage().bucket();
  const imageSize = imageUrl.match(/((w\d{2,3})|(original))/)[0];
  // TODO: Check if file exists before uploading to limit usage
  const filePath = `${tmdbId}/${imageSize}`;
  return bucket.upload(imageUrl, { destination: filePath })
    .then(upload => {
      const posterObject = {};
      posterObject[imageSize] = upload[0].metadata.mediaLink;
      return posterObject;
    });
}

exports.onFileCreate = functions.firestore.document('users/{userId}/files/{fileId}').onCreate(event => {
  const file = event.data.data();
  if (!file.name) {
    return console.error('Created file doesn\'t have a name'); // eslint-disable-line no-console
  }

  const movieTitle = getMovieNameFromFile(file);
  return tmdbHelper.movie.search(movieTitle)
    .then(searchResults => {
      return createMovie(event.params.userId, searchResults.results[0]);
    })
    .then(movie => {
      const docPath = `users/${event.params.userId}/files/${event.params.fileId}`;
      const movieRef = firestore.doc(movie.path);
      return firestore.doc(docPath).update({
        movie: movieRef
      });
    })
    .catch(console.error); // eslint-disable-line no-console
});

exports.onFileDelete = functions.firestore.document('users/{userId}/files/{fileId}').onDelete(event => {
  const fileRef = event.data;
  const file = fileRef.previous.data();
  if (!file.movie) return;

  const fileCollection = firestore.collection(`users/${event.params.userId}/files`);
  return fileCollection.where('movie', '==', file.movie).get()
    .then(querySnapshot => {
      if (!querySnapshot.empty) return;
      return file.movie.delete();
    })
    .catch(console.error); // eslint-disable-line no-console
});

exports.onMovieCreate = functions.firestore.document('users/{userId}/movies/{movieId}').onCreate(event => {
  // Original excluded to limit download size;
  const validWidths = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780'];
  const posterPath = event.data.data().poster_path;
  if (!posterPath) return console.error('Created movie doesn\'t have a poster path'); // eslint-disable-line no-console

  const posterUrls = validWidths.map(width => `http://image.tmdb.org/t/p/${width}${posterPath}`);
  const posterUploads = posterUrls.map(posterUrl => uploadFile(event.data.data().id, posterUrl));
  return Promise.all(posterUploads)
    .then(results => {
      const docPath = `/users/${event.params.userId}/movies/${event.params.movieId}`;
      const posters = results.reduce((reducer, posterObject) => Object.assign(reducer, posterObject), {});
      return firestore.doc(docPath).update({
        posters
      });
    })
    .catch(console.error); // eslint-disable-line no-console
});
