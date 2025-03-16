document.addEventListener("DOMContentLoaded", function() {
    const apikey = "bc2d49012d630dfa989edad726215714";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchbox = document.querySelector(".search input");
    const searchbtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".Weather-icon");

    async function checkweather(city) {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather-report").style.display = "none";
        } else {
            const data = await response.json();
            updateWeather(data);
        }
    }

    function updateWeather(data) {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".hum-details").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind-details").innerHTML = data.wind.speed + " km/h";

        console.log("Weather condition:", data.weather[0].main);
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.style.width = "200px";
        weatherIcon.style.height = "200px";
        document.querySelector(".weather-report").style.display = "block";
    }

    searchbtn.addEventListener("click", () => {
        checkweather(searchbox.value);
    });
});
