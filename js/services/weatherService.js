
function cityWeather(lat, lng) {
    var prm = fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lng}&appid=eb5121c9c55563f19e333cafc2b5dcfe`);
    return prm.then(function (res) {
        var prmJson = res.json();
        return prmJson.then(function (data) {
            return data;
        })
    })
}

export default{
    cityWeather
    
}