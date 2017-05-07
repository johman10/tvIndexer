const path = require('path');
const fs = require('fs');
const nameParser = require('torrent-name-parser');

const fileHandler = {
  search (startPath, filter, fileList) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(startPath)) {
        reject('The directory ' + startPath + ' doesn\'t exist');
      }

      fileList = fileList || [];
      folderChecker(startPath, filter, fileList);
      resolve(fileList);
    });
  },

  parseData (filePaths) {
    let videoDataArray = [];
    filePaths.forEach((filePath) => {
      let fileName = path.basename(filePath);
      let videoData = nameParser(fileName);
      videoData.filePath = filePath;
      videoDataArray.push(videoData);
    });
    return videoDataArray;
  }
};

function folderChecker (folderPath, filter, fileList) {
  var files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    var filePath = path.join(folderPath, file);
    var stat = fs.lstatSync(filePath);
    if (stat.isDirectory()){
      folderChecker(filePath, filter, fileList);
    } else if (filter.test(file)) {
      fileList.push(filePath);
    }
  });
}

module.exports = fileHandler;
