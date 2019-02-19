class OneItemSlider {

    constructor(selector) {

        this.init = function () {

            const slider = document.querySelector(selector);

            const container = slider.querySelector('.slider__list');
            const slidesCount = slider.querySelectorAll('.slider__item').length;

            const rightButton = slider.querySelector('.slider__arrow--next');
            const leftButton = slider.querySelector('.slider__arrow--prev');

            const offset = -100;

            container.style.left = `${offset}%`;
            container.style.minWidth = slidesCount * 100 + '%';

            leftButton.addEventListener('click', (evt) => {
                evt.preventDefault();
                slideTo('prev');
            });

            rightButton.addEventListener('click', (evt) => {
                evt.preventDefault();
                slideTo('next');
            });

            function slideTo(direction) {

                if (direction === 'prev') {
                    container.style.left = '0%';
                } else {
                    container.style.left = '-200%';
                }

                container.style.transition = 'left 0.3s';

                setTimeout(() => {

                    if (direction === 'prev') {
                        container.insertBefore(container.lastElementChild, container.firstElementChild);
                    } else {
                        container.appendChild(container.firstElementChild);
                    }

                    container.style.left = `${offset}%`;
                    container.style.transition = 'none';
                }, 300);

            }
        }
    }
}

