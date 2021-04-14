import File from 'models/file';
import { search, findInfo, exists, fullPath } from 'helpers/filesystem-helper';

const MOVIES_DIRECTORY = '/Volumes/Movies';

export function syncMovies () {
  cleanup();
  findMovies();
}

function findMovies () {
  return getFilePaths()
    .then(filePaths => {
      const fileInfos = filePaths.map(filePath => findInfo(filePath, true));
      fileInfos.forEach(fileInfo => {
        fileInfo.fullPath = fullPath(fileInfo);
      });
      const filePromises = fileInfos.map(fileInfo => File.doc().set(fileInfo));
      return Promise.all(filePromises);
    })
    .catch((error) => {
      // TODO: better errorHandling
      throw error;
    });
}

export function cleanup () {
  return File.get()
    .then(files => {
      const filesToRemove = files.docs.filter(file => !exists(file.fullPath));
      return Promise.all(filesToRemove.map(file => file.delete()));
    });
}

function getFilePaths () {
  const filePaths = search(MOVIES_DIRECTORY, /\(.avi|.mkv|.mp4\)$/);
  return File.get()
    .then(files => {
      return filePaths.filter(filePath => !files.docs.some(file => file.fullPath === filePath));
    });
}
