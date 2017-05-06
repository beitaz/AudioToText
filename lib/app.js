import Speech from '@google-cloud/speech';
import fs from 'fs';
import async from 'async';

import {createOutputStream, getFilePath, getFiles} from './files';
import * as config from './config.json';

const client = Speech();
const options = config.audio;
const files = getFiles(config.path);

const stream = createOutputStream();

const start = () => {
  if (!files.length) {
    stream.close();
    return;
  }

  const filename = files.shift();
  const file = getFilePath(filename);

  debug('Recognizing ' + filename);

  recognize(file)
    .then(transcription => {
      stream.write(transcription);

      // Recursive call
      start();
    })
    .catch(err => {
      console.error(err);
      stream.close();
    });
}

const recognize = (file) => {
  return client.recognize(file, options)
    .then(results => {
      return results[0];
    });
}

const debug = (message) => {
  if (config.debug) {
    console.log(message);
  }
}

start();