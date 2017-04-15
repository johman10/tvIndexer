const path = require('path');
const fs = require('fs');

class FindFile {
  constructor (startPath, filter) {
    this.filter = filter;
    this.startPath = startPath;
    this.selectedFiles = [];

    return this.run();
  }

  run () {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.startPath)) {
        reject('The directory ' + this.startPath + ' doesn\'t exist');
      }

      this.folderChecker();
      resolve(this.selectedFiles);
    });
  }

  folderChecker (folderPath) {
    var scanFolder = folderPath || this.startPath;
    var files = fs.readdirSync(scanFolder);
    files.forEach((fileName) => {
      var filePath = path.join(scanFolder, fileName);
      var stat = fs.lstatSync(filePath);
      if (stat.isDirectory()){
        this.folderChecker(filePath);
      } else if (this.filter.test(fileName)) {
        this.selectedFiles.push(filePath);
      }
    });
  }
}

module.exports = FindFile;
