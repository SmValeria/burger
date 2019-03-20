(function () {
    class OneItemSlider {

        constructor(option) {

            this.init = function () {

                let rightButton, leftButton;

                let activeSlide = 0;
                let transitionProperty = 'transform';
                let position = 0;
                const offset = 100;
                const md = new MobileDetect(window.navigator.userAgent);
                const isMobile = md.mobile();

                let inscroll = false;

                const slider = document.querySelector(`.${option.slider}`);

                const container = slider.querySelector(`.${option.sliderListClass}`);
                let slidesArray = slider.querySelectorAll(`.${option.sliderItemsClass}`);


                if (option.infinite) {
                    activeSlide = 1;
                    position -= offset;
                    let cloneFirstSlide = container.firstElementChild.cloneNode(true);
                    let cloneLastSlide = container.lastElementChild.cloneNode(true);

                    container.insertBefore(cloneLastSlide, container.firstElementChild);
                    container.appendChild(cloneFirstSlide);
                }

                slidesArray = slider.querySelectorAll(`.${option.sliderItemsClass}`);
                slidesArray[activeSlide].classList.add('active');

                const slidesCount = container.childElementCount;

                setCurrentPosition(position);

                if (option.controls) {
                    rightButton = slider.querySelector(`.${option.controlsClass}--next`);
                    leftButton = slider.querySelector(`.${option.controlsClass}--prev`);

                    leftButton.addEventListener('click', (evt) => {
                        evt.preventDefault();
                        let activeSlide = getIndexActiveSlide(slidesArray);
                        let index = activeSlide - 1;
                        slideTo(index);
                    });

                    rightButton.addEventListener('click', (evt) => {
                        evt.preventDefault();
                        let activeSlide = getIndexActiveSlide(slidesArray);
                        let index = activeSlide + 1;
                        slideTo(index);
                    });

                }

                if (option.isWheel) {

                    slider.addEventListener('wheel', (evt) => {

                        if (inscroll) {
                            return
                        }
                        inscroll = true;

                        const delta = evt.deltaY;

                        let activeSlide = getIndexActiveSlide(slidesArray);
                        let index;
                        if (delta > 0) {
                            index = activeSlide + 1;
                        }

                        if (delta < 0) {
                            index = activeSlide - 1;
                        }

                        slideTo(index);
                        setTimeout(() => {
                            inscroll = false;
                        }, 600);
                    });
                }

                if (option.direction === "vertical") {
                    document.addEventListener('keydown', (evt) => {
                        if(evt.keyCode !== 40 && evt.keyCode !== 38) {
                            return
                        }
                        if (inscroll) {
                            return
                        }
                        inscroll = true;

                        let activeSlide = getIndexActiveSlide(slidesArray);
                        let index;

                        switch (evt.keyCode) {
                            case 40:
                                index = activeSlide + 1;
                                break;
                            case 38:
                                index = activeSlide - 1;
                                break;
                        }

                        slideTo(index);
                        setTimeout(() => {
                            inscroll = false;
                        }, 600);

                    });

                    if(isMobile) {
                        const viewBox = document.querySelector('body');
                        const mc = new Hammer(viewBox);
                        mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });


                        mc.on("panleft panright panup pandown tap press", (evt) => {

                            if(evt.type !== "panup" && evt.type !== "pandown") {
                                return
                            }

                            if (inscroll) {
                                return
                            }
                            inscroll = true;

                            let activeSlide = getIndexActiveSlide(slidesArray);
                            let index;

                            switch (evt.type) {
                                case "panup":
                                    index = activeSlide + 1;
                                    break;
                                case "pandown":
                                    index = activeSlide - 1;
                                    break;
                            }

                            slideTo(index);
                            setTimeout(() => {
                                inscroll = false;
                            }, 600);

                        });
                    }

                    let menuButtons = document.querySelectorAll('[data-scroll-to]');

                    menuButtons.forEach((button) => {
                        button.addEventListener('click', (evt) => {
                            evt.preventDefault();
                            const target = parseFloat(evt.currentTarget.getAttribute('data-scroll-to'));
                            let activeSlide = getIndexActiveSlide(slidesArray);
                            slideTo(target);
                            setTimeout(() => {
                                inscroll = false;
                            }, 600);
                        })
                    });
                }


                function slideTo(index) {

                    container.style.transition = `${transitionProperty} 0.3s`;
                    if (!option.infinite) {
                        if (index < 0 || index > slidesCount - 1) {
                            return
                        }
                    }

                    let currentOffset = (activeSlide - index) * offset;
                    position += currentOffset;

                    setCurrentPosition(position);

                    setTimeout(() => {
                        if (option.infinite) {
                            if (index === 0) {

                                index = slidesCount - 2;
                                position = (offset * index) * -1;
                                container.style.transition = 'none';
                                setCurrentPosition(position);

                            } else if (index === slidesCount - 1) {

                                index = 1;
                                position = -100;
                                container.style.transition = 'none';
                                setCurrentPosition(position);

                            }

                        }

                        slidesArray.forEach(function (slide, i) {
                            removeActiveClass(slide, 'active');

                            if(index === i) {
                                slide.classList.add('active');
                            }
                        });

                        activeSlide = index;
                        if(option.direction === "vertical") {

                            switchActiveClassInAsideMenu(activeSlide);
                        }
                    }, 300);


                }

                function removeActiveClass(element, classActive) {
                    element.classList.remove(classActive);
                }

                function setCurrentPosition(position) {
                    if (option.direction === 'horizontal') {
                        container.style[transitionProperty] = `translateX(${position}%)`;
                    }

                    if (option.direction === 'vertical') {
                        container.style[transitionProperty] = `translateY(${position}%)`;
                    }
                }

                function getIndexActiveSlide(arr) {
                    let index;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].classList.contains('active')) {
                            index = i;
                        }
                    }
                    return index;
                }

                function switchActiveClassInAsideMenu(active) {
                    const asideMenuList = document.querySelectorAll('.page-navigation__item');
                    asideMenuList.forEach((item, index) => {
                        item.classList.remove('active');
                        if(index === active) {
                            item.classList.add('active');
                        }
                    });
                }

            }

        }
    }
    let burgerSlider = new OneItemSlider({
        direction: 'horizontal',
        slider: 'slider__container',
        sliderListClass: 'slider__list',
        sliderItemsClass: 'slider__item',
        dots: false,
        controls: true,
        controlsClass: 'slider__arrow',
        infinite: true,
        isWheel: false,
    });


    let mainSlider = new OneItemSlider({
        direction: 'vertical',
        slider: 'wrapper',
        sliderListClass: 'maincontent',
        sliderItemsClass: 'section',
        dots: false,
        controls: false,
        infinite: false,
        isWheel: true,
    });

    document.addEventListener('DOMContentLoaded', () => {
        burgerSlider.init();
        mainSlider.init();
    });
})();