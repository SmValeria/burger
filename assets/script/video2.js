const videoContainer = document.querySelector('.video');
const video = videoContainer.querySelector('.video__element');
const playPauseButton = videoContainer.querySelector('.video__control-element');
const progressBar = videoContainer.querySelector('.video__progress-bar');
const progressPoint = videoContainer.querySelector('.video__progress-circle');


video.addEventListener('ended', resetPlayer);
video.addEventListener('timeupdate', updateProgressBar, false);
playPauseButton.addEventListener('click', togglePlayPause);

progressBar.addEventListener('click', setCurrentTime);

function setCurrentTime(evt) {
    const x = evt.offsetX / evt.currentTarget.clientWidth;
    console.log(evt.offsetX);
    debugger;
    video.currentTime = Math.floor(x * video.duration);
    console.log(video.currentTime);
}


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