import File from 'models/file';
import { search, findFileInfo } from 'helpers/filesystem-helper';

const MOVIES_DIRECTORY = '/Volumes/Movies/';

export function syncMovies () {
  const filePaths = search(MOVIES_DIRECTORY, /\(.avi|.mkv|.mp4\)$/);
  // TODO: code improve this
  const fileRecords = filePaths.map(filePath => new File(findFileInfo(filePath, true)));
  const moviePromises = fileRecords.map(fileRecord => fileRecord.buildMovie());
  Promise.all(moviePromises)
    .then((movieRecords) => {
      movieRecords.forEach((movieRecord, index) => {
        movieRecord = movieRecord.saveFirstResult();
        fileRecords[index].movie = movieRecord.id;
      });
      fileRecords.map(fileRecord => fileRecord.save());
      return movieRecords;
    })
    .catch((error) => {
      // TODO: better errorHandling
      throw error;
    });
}

export default { syncMovies };
