class createMap {

    constructor (selector) {
        this.init = function (options, locations) {

            let mapContainer = document.querySelector(selector);
            let map = new google.maps.Map(mapContainer, options);

            let markers = locations.map(function(location, i) {
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

                geocoder.geocode({'location': coordinats}, function (results, status) {

                    if (status === 'OK') {
                        if (results[0]) {
                            showModal(event, results[0].formatted_address);
                        } else {
                            showModal(event, 'No results found');
                        }
                    } else {
                        showModal(event,'Geocoder failed due to: ' + status);
                    }
                });
            }
        }
    }
}

