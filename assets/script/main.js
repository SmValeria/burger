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

let burgerSlider = new OneItemSlider('.slider__container');

document.addEventListener('DOMContentLoaded', () => {
    menu.init();
    team.init();
    burgerSlider.init();
});