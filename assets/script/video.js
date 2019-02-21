const videoContainer = document.querySelector('.video');
const video = videoContainer.querySelector('.video__element');
const playPauseButton = videoContainer.querySelector('.video__control-element');
const progressBar = videoContainer.querySelector('.video__progress-bar');
const progressPoint = videoContainer.querySelector('.video__progress-circle');


playPauseButton.addEventListener('click', togglePlayPause);
video.addEventListener('ended', resetPlayer);
video.addEventListener('timeupdate', updateProgressBar, false);
progressBar.addEventListener('click', function () {
    video.currentTime = 200;
    console.log(video.currentTime);
});

function togglePlayPause() {
    if (video.paused || video.ended) {
        videoContainer.classList.add('play');
        video.play();
    } else {
        videoContainer.classList.remove('play');
        video.pause();
    }
}

function resetPlayer() {
    progressBar.value = 0;
    video.currentTime = 0;
    videoContainer.classList.remove('play');
}

function updateProgressBar() {
    let percentage = Math.floor((100 / video.duration) *
        video.currentTime);
    progressBar.value = percentage;
    progressPoint.style.left = `${percentage}%`;
}