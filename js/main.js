
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weatherService.js'

window.onload = () => {
    mapService.initMap()
        .then(
            () => {
                mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            }).catch(console.warn);

    return locService.getPosition()
        .then(
            (pos) => {
                mapService.getNewMapPos(pos.coords.latitude, pos.coords.longitude);
                mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                return weatherService.cityWeather(pos.coords.latitude, pos.coords.longitude)
                    .then(
                        (wetherInfo) => {
                            renderWhetherData(wetherInfo);
                            return locService.cityCountry(wetherInfo.coord.lat, wetherInfo.coord.lon)
                        }).then(
                            (cityCountryRes) => {
                                renderData(cityCountryRes);
                            })
            })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.my-location').addEventListener('click', () => {
    return locService.getPosition()
    .then(
        (pos) => {
            mapService.getNewMapPos(pos.coords.latitude, pos.coords.longitude);
            mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            return weatherService.cityWeather(pos.coords.latitude, pos.coords.longitude)
                .then(
                    (wetherInfo) => {
                        renderWhetherData(wetherInfo);
                        return locService.cityCountry(wetherInfo.coord.lat, wetherInfo.coord.lon)
                    }).then(
                        (cityCountryRes) => {
                            renderData(cityCountryRes);
                        })
        })
})

document.querySelector('.submit-location').addEventListener('click', () => {
    var inputValue = document.querySelector('input').value;

    return locService.getInputFromUser(inputValue)
    .then(
        (pos) => {
            mapService.getNewMapPos(pos.results[0].geometry.location.lat, pos.results[0].geometry.location.lng);
            mapService.addMarker({ lat: pos.results[0].geometry.location.lat, lng: pos.results[0].geometry.location.lng });
            return weatherService.cityWeather(pos.results[0].geometry.location.lat, pos.results[0].geometry.location.lng)
                .then(
                    (wetherInfo) => {
                        renderWhetherData(wetherInfo);
                        return locService.cityCountry(wetherInfo.coord.lat, wetherInfo.coord.lon)
                    }).then(
                        (cityCountryRes) => {
                            renderData(cityCountryRes);
                        })
        })
})

function renderData(data) {
    var cityCountryStr = data.results[0].formatted_address;
    var strHtml = '';
    strHtml = `Your current position: ${cityCountryStr}`;
    var locationOnDom = document.querySelector('.location');
    locationOnDom.innerText = strHtml;
}

function renderWhetherData(wetherInfo) {
    var icon = wetherInfo.weather[0].icon;
    var location = wetherInfo.name;
    var genWether = wetherInfo.weather[0].description;
    var currTemp = wetherInfo.main.temp;
    var minTemp = wetherInfo.main.temp_min;
    var maxTemp = wetherInfo.main.temp_max;
    var wind = wetherInfo.wind.speed;

    var strHtml = '';

    strHtml = `${location} ${genWether} 
    ${currTemp} tempature from ${minTemp} to ${maxTemp} C, wind ${wind} m/hr`;

    var weatherDetails = document.querySelector('.weather-details');
    weatherDetails.innerText = strHtml;

    var iconDom = document.querySelector('.icon');
    iconDom.innerHTML = `<img src='http://openweathermap.org/img/w/${icon}.png' alt='Icon depicting current weather.'>`;
}


