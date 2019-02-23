class MediaPlayer {

    constructor(selector) {
        this.init = function () {
            const videoContainer = document.querySelector(selector);
            const video = videoContainer.querySelector(`.${selector}__element`);

            const playPauseControlButton = videoContainer.querySelector(`.${selector}__playpause-btn`);
            const playVideoButton = videoContainer.querySelector(`.${selector}__play-btn`);

            const progressBar = videoContainer.querySelector(`.${selector}__progress-bar`);
            const progressCurrent = progressBar.querySelector(`.${selector}__progress-current`);

            const volumeButton = videoContainer.querySelector(`.${selector}__volume-btn`);
            const volumeBar = videoContainer.querySelector(`.${selector}__volume-bar`);
            const volumeCurrent = volumeBar.querySelector(`.${selector}__volume-current`);

            video.addEventListener('loadedmetadata', showVideoOnReady, false);
            video.addEventListener('click', togglePlayPause, false);

            video.addEventListener('play', toggleActiveVideoClass);
            video.addEventListener('pause', toggleActiveVideoClass);
            video.addEventListener('ended', resetPlayer);

            video.addEventListener('timeupdate', updateProgressBar, false);
            progressBar.addEventListener('click', setCurrentTime);

            playPauseControlButton.addEventListener('click', togglePlayPause);
            playVideoButton.addEventListener('click', togglePlayPause);

            video.addEventListener('volumechange', updateVolumeControls);
            volumeBar.addEventListener('click', setCurrentVolume);
            volumeButton.addEventListener('click', toggleVolume);


            function showVideoOnReady() {
                videoContainer.classList.remove('hidden');
                if (!video.muted) {
                    video.volume = 1;
                    volumeCurrent.style.width = `100%`;
                } else {
                    video.volume = 0;
                    volumeButton.classList.add('video__volume-btn--muted')
                }
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
            }

            function setCurrentTime(evt) {
                let offset = evt.layerX / evt.currentTarget.offsetWidth;
                video.currentTime = Math.floor(offset * video.duration);
            }

            function toggleVolume() {
                video.muted = !video.muted;
            }

            function updateVolumeControls() {
                let progress = Math.floor(video.volume * 100);
                volumeCurrent.style.width = `${progress}%`;

                if (video.muted) {
                    volumeButton.classList.add('video__volume-btn--muted');
                }

                if (!video.muted) {
                    volumeButton.classList.remove('video__volume-btn--muted');
                }
            }

            function setCurrentVolume(evt) {
                let offset = evt.layerX / evt.currentTarget.offsetWidth;
                video.volume = Math.round(offset * 10) / 10;
                video.muted = false;
            }
        }
    }
}