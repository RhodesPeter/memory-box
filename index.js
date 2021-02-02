let shouldStop = false;
let stopped = false;
const downloadLink = document.getElementById('download');
const stopButton = document.getElementById('stop');
const startButton = document.getElementById('start');

stopButton.addEventListener('click', function() {
    shouldStop = true;
});

startButton.addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess);
});

const handleSuccess = function(stream) {
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if(shouldStop === true && stopped === false) {
        mediaRecorder.stop();
        stopped = true;
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'user-audio.wav';
    //   const audioSource = document.querySelector('.play-controls__source');
    //   audioSource.src = URL.createObjectURL(new Blob(recordedChunks));
    });

    mediaRecorder.start(1000);
};
