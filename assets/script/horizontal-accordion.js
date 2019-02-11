let menu = new AccordionHorizontal({
    toggleElem: 'menu__item-header-wr',
    item: 'menu__item',
    itemActive: 'menu__item--active',
    list: 'menu__list'
});

document.addEventListener("DOMContentLoaded", menu);


function AccordionHorizontal(accordion) {

    const list = document.querySelector(`.${accordion.list}`);
    const items = list.querySelectorAll(`.${accordion.item}`);
    const toggleElements = list.querySelectorAll(`.${accordion.item} .${accordion.toggleElem}`);
    const closeButtons = list.querySelectorAll('.menu__hamburger');

    toggleElements.forEach(function (item) {
        item.addEventListener('click', function (evt) {

            const accordionItem = getCurrentAccordionItem(item);

            let isActiveItem = accordionItem.classList.contains(accordion.itemActive);

            if (!isActiveItem) {
                items.forEach(function (elem) {
                    removeActiveClass(elem);
                })
            }

            accordionItem.classList.toggle(accordion.itemActive);

        })
    });

    closeButtons.forEach(function (button) {
        button.addEventListener('click', function (evt) {
            evt.preventDefault();
            const accordionItem = getCurrentAccordionItem(button);
            removeActiveClass(accordionItem);
        });
    });

    function getCurrentAccordionItem(element) {
        return element.closest(`.${accordion.item}`);
    }

    function removeActiveClass(element) {
        element.classList.remove(accordion.itemActive);
    }
}