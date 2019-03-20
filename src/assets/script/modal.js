(function () {
    let htmlForHamburger = `
    <a href="#"
        class="hamburger hamburger--red hamburger--close popup__hamburger popup--close">
        <span class="hamburger__line hamburger__line-top"></span>
        <span class="hamburger__line hamburger__line-middle"></span>
        <span class="hamburger__line hamburger__line-bottom"></span>
    </a>`;


    function showModal(evt, text) {
        let isReview = false;
        if (evt) {
            evt.preventDefault();
            isReview = evt.target.classList.contains('reviews__link');
        }


        const container = document.querySelector('.wrapper');
        const popup = document.createElement('div');

        popup.classList.add('popup');

        let message = `<div class="container popup__container">
                       <div class="popup__content text-center">`;

        if (isReview) {
            const reviewItem = evt.target.closest('.reviews__item');
            const reviewAuthor = reviewItem.querySelector('.reviews__author').textContent;
            const reviewText = reviewItem.querySelector('.reviews__text').textContent;

            message += `<h4 class="title popup__title text-left">${reviewAuthor}</h4>`;
            message += `<p class="popup__review text-left">${reviewText}</p>`;
            message += htmlForHamburger;
        } else {
            message += `<p class="popup__text">${text}</p>`;
            message += `<a href="#" class="btn btn--background-red popup__btn popup--close">Закрыть</a>`;

        }

        message += `</div></div>`;

        popup.innerHTML = message;

        container.appendChild(popup);

        closePopupButton = popup.querySelector('.popup--close');

        closePopupButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            container.removeChild(popup);
        })
    }

    const openReviewButtons = document.querySelectorAll('.reviews__link');

    openReviewButtons.forEach(function (button) {
        button.addEventListener('click', showModal);
    });





    const form = document.querySelector('.form__elem');
    const submitButton = form.querySelector('[type="submit"]');

    submitButton.addEventListener('click', function (evt) {

        const name = form.elements.name.value;
        const phone = form.elements.phone.value;
        const comment = form.elements.comment.value;
        const mail = "test@mail.com";

        let formData = new FormData();

        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("comment", comment);
        formData.append("to", mail);

        if (!checkForm()) {
            return;
        }

        evt.preventDefault();
        fetch('https://webdev-api.loftschool.com/sendmail', {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.json();
        }).then((info) => {
            return info.message;
        }).then((message) => {
            showModal(evt, message)
        }).catch(() => {
            showModal(evt, 'Что-то пошло не так...')
        })
    });

    function checkForm() {
        let validity = true;

        if (!checkInput(form.elements.name)) {
            validity = false;
        }

        if (!checkInput(form.elements.phone)) {
            validity = false;
        }

        if (!checkInput(form.elements.comment)) {
            validity = false;
        }


        return validity
    }


    function checkInput(input) {
        return input.checkValidity();
    }




    class createMap {

        constructor(selector) {
            this.init = function (options, locations) {

                let mapContainer = document.querySelector(selector);
                let map = new google.maps.Map(mapContainer, options);

                let markers = locations.map(function (location, i) {
                    return new google.maps.Marker({
                        position: location,
                        map: map,
                        icon: 'assets/img/map-marker.svg'
                    });
                });

                let geocoder = new google.maps.Geocoder;

                markers.forEach(function (marker) {
                    marker.addListener('click', function (event) {
                        let latlng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
                        showLocation(geocoder, map, latlng);
                    });

                });

                google.maps.event.addDomListener(window, "resize", function () {
                    let center = map.getCenter();
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(center);
                });

                function showLocation(geocoder, map, coordinats) {
                    let text;
                    geocoder.geocode({'location': coordinats}, function (results, status) {

                        if (status === 'OK') {
                            if (results[0]) {
                                text = results[0].formatted_address;
                            } else {
                                text = 'No results found';
                            }
                        } else {
                            text = 'Geocoder failed due to: ' + status;
                        }
                        showModal(null, text);
                    });

                }
            }
        }
    }


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
        scrollwheel:  false,
        draggable: false
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

    document.addEventListener('DOMContentLoaded', () => {
        contactMap.init(contactMapOptions, locations);
    });

})()