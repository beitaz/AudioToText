import fs from 'fs';
import * as config from './config.json';

export function createOutputStream() {
  return fs.createWriteStream(config.saveFile);
}

export function getFilePath(file) {
  return config.path + '/' + file;
}

export function getFiles(path) {
  return fs.readdirSync(path)
          .map(file => {
            return {
              file: file,
              id: getFileId(file)
            }
          })
          .sort((a, b) => {
            return a.id - b.id;
          })
          .map(file => file.file);
}

function getFileId(file) {
  const str = file.split('-')[1].split('.')[0];

  return parseInt(str);
}