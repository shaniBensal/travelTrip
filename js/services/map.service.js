
var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            map = new google.maps.Map(document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        })
}

function getNewMapPos(lat,lng) {
    var center = new google.maps.LatLng(lat, lng);
    map.panTo(center);
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'You Are Here'
    });
    return marker;
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCaU97s16ZjBpECK17Z0DLNA9odJh2ddKI';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

export default {
    initMap,
    addMarker,
    getNewMapPos
}