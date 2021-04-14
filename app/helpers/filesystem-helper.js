import fs from 'fs';
import path from 'path';
import torrentNameParser from 'torrent-name-parser';

export function search (startPath, filter) {
  if (!fs.existsSync(startPath)) {
    throw new Error('The directory ' + startPath + ' doesn\'t exist');
  }

  let filePathList = [];
  filePathList = _folderChecker(startPath, filter, filePathList);
  return filePathList;
}

export function findInfo (filePath, parseTorrent = false) {
  if (!filePath) return;

  const fileInfo = path.parse(filePath);
  let torrentInfo;
  if (parseTorrent) {
    torrentInfo = torrentNameParser(fileInfo.name);
  }
  return { ...fileInfo, torrentInfo };
}

export function fullPath (file) {
  if (!file.dir || !file.base) return;
  return path.join(file.dir, file.base);
}

export function exists (filePath) {
  return fs.existsSync(filePath);
}

function _folderChecker (folderPath, filter, fileList) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()){
      _folderChecker(filePath, filter, fileList);
    } else if (!filter || filter.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}
