# AudioToText
Node.js application that uses Google's Cloud Speech API to convert long audios (up to 80 minutes) to text.

## Google Cloud Setup

First, follow the steps on [cloud.google.com](https://cloud.google.com/speech/docs/getting-started) to set up your project. You will need to create a project, enable the billing (by adding a credit card) and enable the Cloud Speech API for the newly created project.

Once you are done, you will need to generate the credentials for your project. You can do so by clicking [here](https://console.cloud.google.com/apis/credentials). Please note that the Key type should be Service Account Key and the Credentials format should be `json`.

## Actual Setup
Install all the dependencies with `npm install` or `yarn`. Then, build the project (transform ES6 code to ES5 through Babel) with `npm run build` or `yarn run build`.

Next, move the `config.json` file into the newly created `dist` folder. Next, modify the `start.sh` file by adding your Google Cloud Credentials you created in the previous steps.

Finally, we need to modify our `config.json`:

```javascript
{
  "path": "audios", // The folder where files with name-[Numeric ID].ext are stored, relative to dist folder
  "audio": {
    "encoding": "LINEAR16", // The audio encoding [https://cloud.google.com/speech/reference/rpc/google.cloud.speech.v1beta1#google.cloud.speech.v1beta1.RecognitionConfig.AudioEncoding]
    "sampleRateHertz": 16000, // The sample rate https://cloud.google.com/speech/reference/rpc/google.cloud.speech.v1beta1#google.cloud.speech.v1beta1.RecognitionConfig
    "languageCode": "es-US", // Language of the audio [https://cloud.google.com/speech/docs/languages]
    "profanityFilter": false // Insults will be hidden (f***)
  },
  "saveFile": "transcription.txt", // The transcript save file
  "debug": true // Verbose mode
}
```

To run the script, you can run these commands on a console session:

```shell
# Don't log messages
$ ./start.sh

# Pipe app output to file
$ ./start.sh > log.txt
```

## Audio file prequisites:

The audio files duration should be less than a minute (if not, they will be rejected by the API), and they should be placed under the `path` folder you specified on the `config.json` file. The file names should follow this pattern:

```
name-[Numeric ID].extension
```

Where the Numeric ID should be a possitive integer. You can change this behaviour on the [files.js](lib/files.js) file, on the `getFileId(filename)` method.

## Why did you make this?
One of my family relatives is an interviewer, and he asked me for a way to convert a brute audio file into a text file. While this isn't perfect, it made his job much easier.

This project also was a learning opportunity for me, as I had never used Google Cloud.