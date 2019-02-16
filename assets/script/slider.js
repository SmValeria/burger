class FullScreenSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);

        this.sliderContainer = this.slider.querySelector('.slider__list');
        this.sliderItemsCount = this.slider.querySelectorAll('.slider__item').length;

        this.rightButton = this.slider.querySelector('.slider__arrow--next');
        this.leftButton = this.slider.querySelector('.slider__arrow--prev');

        this.offset = -100;

        this.sliderContainer.style.left = `${this.offset}%`;
        this.sliderContainer.style.minWidth = this.sliderItemsCount * 100 + '%';

        this.leftButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.slideTo('prev');
        });

        this.rightButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.slideTo('next');
        });
    }

    slideTo(direction) {
        new Promise((resolve, reject) => {

            if (direction === 'prev') {
                this.sliderContainer.style.left = '0%';
            } else {
                this.sliderContainer.style.left = '-200%';
            }

            this.sliderContainer.style.transition = 'left 0.3s';

            resolve();

        }).then(() => {

            setTimeout(() => {

                if (direction === 'prev') {
                    this.sliderContainer.insertBefore(this.sliderContainer.lastElementChild, this.sliderContainer.firstElementChild);
                } else {
                    this.sliderContainer.appendChild(this.sliderContainer.firstElementChild);
                }

                this.sliderContainer.style.left = `${this.offset}%`;
                this.sliderContainer.style.transition = 'none';
            }, 300);
        });
    }

}

new FullScreenSlider ('.slider__container');