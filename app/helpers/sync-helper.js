import File from 'models/file';
import Movie from 'models/movie';
import { search, findInfo, exists } from 'helpers/filesystem-helper';

const MOVIES_DIRECTORY = '/Volumes/Movies';

export function syncMovies () {
  cleanup();
  findMovies();
}

export function findMovies () {
  const filePaths = search(MOVIES_DIRECTORY, /\(.avi|.mkv|.mp4\)$/);
  // TODO: code improve this
  const fileRecords = filePaths.map(filePath => new File(findInfo(filePath, true)));
  const moviePromises = fileRecords.map(fileRecord => fileRecord.buildMovie());
  Promise.all(moviePromises)
    .then((movieRecords) => {
      movieRecords.forEach((movieRecord, index) => {
        movieRecord = movieRecord.saveFirstResult();
        fileRecords[index].record.movie = movieRecord.id;
      });
      fileRecords.map(fileRecord => fileRecord.save());
      return movieRecords;
    })
    .catch((error) => {
      // TODO: better errorHandling
      throw error;
    });
}

export function cleanup () {
  const files = File.findAll();
  const filePaths = files.map(file => file.fullPath);
  filePaths.forEach((filePath, index) => {
    const fileExists = exists(filePath);
    if (!fileExists) {
      files[index].remove([{ class: Movie, type: 'hasOne' }]);
    }
  });
}

export default { syncMovies };
