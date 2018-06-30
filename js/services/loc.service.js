var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return Promise.resolve(locs);
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

function cityCountry(lat, lng) {
    var prm = fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCaU97s16ZjBpECK17Z0DLNA9odJh2ddKI`);
    return prm.then(function (res) {
        var prmJson = res.json();
        return prmJson.then(function (data) {
            return data;
        })
    })
}

function getInputFromUser(txt) {
    var prm = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${txt}&key=AIzaSyCaU97s16ZjBpECK17Z0DLNA9odJh2ddKI`);
    return prm.then(function (res) {
        var prmJson = res.json();
        return prmJson.then(function (data) {
            return data;
        })
    })
}

export default {
    getPosition,
    cityCountry,
    getInputFromUser
}