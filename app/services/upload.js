import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import XHRUpload from '@uppy/xhr-upload';
import { config, authHeader } from './config';

const PhotoUploader = {
  create: () => {
    const uppy = Uppy({
      // debug: true,
      meta: { type: 'avatar' },
      restrictions: {
        maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      },
      autoProceed: true
    });

    uppy.use(Webcam);
    uppy.use(XHRUpload, {
      endpoint: `${config.apiUrl}/upload/dp`,
      headers: authHeader(),
      fieldName: 'upl'
    });

    return uppy;
  },

  configure: uppy => {
    uppy.use(Webcam);
    uppy.use(XHRUpload, {
      endpoint: `${config.apiUrl}/upload/dp`,
      headers: authHeader(),
      fieldName: 'upl'
    });
  }
};

// uppy.on('upload-success', (file, body) => {
//   // console.log(`upload-success ${JSON.stringify(file)}`);
//   console.log(`upload-success ${JSON.stringify(body)}`);
// });

// uppy.on('complete', result => {
//   console.log(`uppy.on ${JSON.stringify(result.body)}`);
//   // const url = result.successful[0].uploadURL;
//   // console.log(`url: ${url}`);
//   // uppy.close();
// });

export default PhotoUploader;
