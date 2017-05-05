import Speech from '@google-cloud/speech';
import fs from 'fs';

import * as config from './config.json';

const log = console.log;

const client = Speech({
  projectId: config.googleProjectId
});

const recognize = (filename, options) => {
  log('Starting recognition from ' + filename);

  client.startRecognition(filename, options)
    .then(results => {
      const operation = results[0];

      return operation.promise();
    })
    .then(results => {
      const transcription = results[0];

      log('Writing result to disk');
      return saveToFile(config.saveFile, transcription);
    })
    .then(() => {
      log('Success! You can find your transcript on ' + config.saveFile);
    })
    .catch(err => {
      console.error(err);
    })
}

const saveToFile = (filename, text) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filename);

    stream.write(text);
    stream.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

// Start recognition request
recognize(config.file, config.audio);