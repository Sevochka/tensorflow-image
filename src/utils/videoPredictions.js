import getCocoModel from '@/utils/getCocoModel';

let frame;
const predictWebcam = (model, videoEl, predictionCallback) => {
  // Now let's start classifying a frame in the stream.
  model.detect(videoEl).then((predictions) => {
    predictionCallback(predictions);
    frame = window.requestAnimationFrame(predictWebcam
      .bind(null, model, videoEl, predictionCallback));
  });
};

const removeListener = () => {
  if (frame) {
    window.cancelAnimationFrame(frame);
  }
};

const enableCam = async (videoEl) => {
  const model = await getCocoModel();

  // getUsermedia parameters to force video but not audio.
  const constraints = {
    video: true,
  };

  // Activate the webcam stream.
  return new Promise((res) => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
      // eslint-disable-next-line no-param-reassign
        videoEl.srcObject = stream;
        videoEl.addEventListener('loadeddata', () => {
          res(model);
        });
      });
  });
};

// eslint-disable-next-line import/prefer-default-export
export { enableCam, predictWebcam, removeListener };
