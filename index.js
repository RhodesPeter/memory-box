let shouldStop = false;
let stopped = false;
const downloadLink = document.querySelector('.record__download');
const stopButton = document.querySelector('.record__stop');
const startButton = document.querySelector('.record__start');


if (startButton) {
  stopButton.addEventListener('click', function() {
      shouldStop = true;
  });
  
  startButton.addEventListener('click', function() {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  });
}

const handleSuccess = function(stream) {
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    startButton.classList.add('record__start--recording');
    stopButton.classList.remove('invisible');

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if(shouldStop === true && stopped === false) {
        mediaRecorder.stop();
        stopped = true;
        startButton.classList.remove('record__start--recording');
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'user-audio.wav';
      downloadLink.classList.remove('invisible')
    //   const audioSource = document.querySelector('.play-controls__source');
    //   audioSource.src = URL.createObjectURL(new Blob(recordedChunks));
    });

    mediaRecorder.start(1000);
};
