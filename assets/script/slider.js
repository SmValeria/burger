class OneItemSlider {

    constructor(option) {

        this.init = function () {

            let rightButton, leftButton;

            let activeSlide = 0;
            let transitionProperty = 'transform';
            let position = 0;
            const offset = 100;

            let inscroll = false;

            const slider = document.querySelector(`.${option.slider}`);

            const container = slider.querySelector(`.${option.sliderListClass}`);
            let slidesArray = slider.querySelectorAll(`.${option.sliderItemsClass}`);

            setDataIndexAttrToSlide(slidesArray);

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

                    slidesArray.forEach(function (slide) {
                        removeActiveClass(slide, 'active');
                    });
                    slidesArray[index].classList.add('active');
                    activeSlide = index;
                    if(option.direction === "vertical") {

                        switchActiveClassInAsideMenu(activeSlide);
                    }
                }, 300);


            }

            function setDataIndexAttrToSlide(array) {
                array.forEach((item, index) => {
                    item.setAttribute('data-index', index)
                })
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
