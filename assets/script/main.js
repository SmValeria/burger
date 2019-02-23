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

let contactMap = new createMap('.map');

let contactMapOptions = {
    center: {lat: 59.94, lng: 30.32},
    zoom: 11,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    scrollwheel:  false
};

let locations = [
    {
        lat: 59.97,
        lng: 30.31,
    },
    {
        lat: 59.86,
        lng: 30.31,
    },
    {
        lat: 59.92,
        lng: 30.40,
    },
    {
        lat: 59.88,
        lng: 30.48,
    },
];

let video = new MediaPlayer('.video');

document.addEventListener('DOMContentLoaded', () => {
    menu.init();
    team.init();
    burgerSlider.init();
    contactMap.init(contactMapOptions, locations);
    video.init();
});