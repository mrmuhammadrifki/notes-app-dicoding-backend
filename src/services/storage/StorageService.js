const fs = require('fs');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    console.log(path);

    const fileSteam = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileSteam.on('error', (error) => reject(error));
      file.pipe(fileSteam);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
