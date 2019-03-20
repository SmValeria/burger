(function () {
    class Accordion {
        constructor(accordion) {

            this.init = function () {
                const accordionList = document.querySelector(`.${accordion.list}`);
                const accordionItems = accordionList.querySelectorAll(`.${accordion.item}`);

                accordionList.addEventListener('click', function (evt) {

                    evt.preventDefault();

                    const elementClicked = evt.target;
                    const elementClickedClasses = elementClicked.classList.value.split(' ');

                    if (isToggleElement(elementClickedClasses, accordion.toggleElements)) {

                        const currentItem = getCurrentAccordionItem(elementClicked);

                        let isActiveItem = currentItem.classList.contains(accordion.itemActive);

                        if (!isActiveItem) {
                            accordionItems.forEach(function (elem) {
                                removeActiveClass(elem, accordion.itemActive);
                            })
                        }

                        currentItem.classList.toggle(accordion.itemActive);
                    }

                    if (isCloseElement(elementClicked, accordion.closeButton)) {
                        const currentItem = getCurrentAccordionItem(elementClicked);
                        removeActiveClass(currentItem, accordion.itemActive);
                    }

                });

                function getCurrentAccordionItem(element) {
                    return element.closest(`.${accordion.item}`);
                }

                function removeActiveClass(element, classActive) {
                    element.classList.remove(classActive);
                }

                function isToggleElement(currentClasses, toggleClasses) {
                    let isToggle = false;
                    for (let i = 0; i < currentClasses.length; i++) {
                        if (toggleClasses.includes(currentClasses[i])) {
                            isToggle = true;
                            break;
                        }
                    }
                    return isToggle;
                }

                function isCloseElement(currentElement, closeElement) {
                    let isClose = false;
                    if (currentElement.parentNode.classList.contains(closeElement) ||
                        currentElement.classList.contains(closeElement)) {
                        isClose = true;
                    }

                    return isClose;
                }
            }
        }
    }

    let team = new Accordion({
        toggleElements: ['team__member-name'],
        item: 'team__member',
        itemActive: 'team__member--active',
        list: 'team__list',
    });

    let menu = new Accordion({
        toggleElements: ['menu__item-header-wr', 'menu__item-header'],
        item: 'menu__item',
        itemActive: 'menu__item--active',
        list: 'menu__list',
        closeButton: 'menu__hamburger'
    });

    document.addEventListener('DOMContentLoaded', () => {
        menu.init();
        team.init();
    });
})();