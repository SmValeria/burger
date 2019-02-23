class MediaPlayer {

    constructor(selector) {
        this.init = function () {
            const videoContainer = document.querySelector(selector);
            const video = videoContainer.querySelector('.video__element');
            const playPauseControlButton = videoContainer.querySelector('.video__control-element');
            const playVideoButton = videoContainer.querySelector('.video__play-btn');
            const progressBar = videoContainer.querySelector('.video__progress-bar');
            const progressPoint = videoContainer.querySelector('.video__progress-circle');
            const progressCurrent = progressBar.querySelector('.video__progress-current');


            video.addEventListener('canplaythrough', showVideoOnReady, false);
            video.addEventListener('click', togglePlayPause, false);

            video.addEventListener('play', toggleActiveVideoClass);
            video.addEventListener('pause', toggleActiveVideoClass);
            video.addEventListener('ended', resetPlayer);

            video.addEventListener('timeupdate', updateProgressBar, false);
            progressBar.addEventListener('click', setCurrentTime);

            playPauseControlButton.addEventListener('click', togglePlayPause);
            playVideoButton.addEventListener('click', togglePlayPause);


            function showVideoOnReady() {
                videoContainer.classList.remove('hidden');
            }

            function toggleActiveVideoClass() {
                videoContainer.classList.toggle('play');
            }

            function togglePlayPause() {
                (video.paused) ? video.play() : video.pause()

            }

            function resetPlayer() {
                progressBar.value = 0;
                video.currentTime = 0;
            }

            function updateProgressBar() {
                let progress = Math.floor(video.currentTime / video.duration * 100);
                progressCurrent.style.width = `${progress}%`;
                progressPoint.style.left = `${progress}%`;
            }

            function setCurrentTime(evt) {
                let offset = evt.layerX / evt.currentTarget.offsetWidth;
                console.log(offset);
                console.log(Math.floor(offset * video.duration));
                video.currentTime = Math.floor(offset * video.duration);
                console.log(video.currentTime);
            }
        }
    }
}