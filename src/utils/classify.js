const classify = async (imageSrc) => {
  const model = await window.mobilenet.load();
  const image = document.createElement('img');
  image.src = imageSrc;
  return model.classify(image).then((predictions) => predictions);
};

export default classify;
