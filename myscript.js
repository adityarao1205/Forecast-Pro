document.addEventListener("DOMContentLoaded", function() {
    const apikey = "bc2d49012d630dfa989edad726215714";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchbox = document.querySelector(".search input");
    const searchbtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".Weather-icon");
    const tempElement = document.querySelector(".temp");
    const toggleButton = document.querySelector(".temp-toggle");

    let currentTempCelsius = null;
    let isCelsius = true;

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
        currentTempCelsius = data.main.temp;
        tempElement.innerHTML = Math.round(currentTempCelsius) + " °C";
        document.querySelector(".hum-details").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind-details").innerHTML = data.wind.speed + " km/h";

        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.style.width = "200px";
        weatherIcon.style.height = "200px";

        document.querySelector(".weather-report").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

    function toggleTemperature() {
        if (currentTempCelsius !== null) {
            if (isCelsius) {
                // Convert °C to °F
                const tempF = (currentTempCelsius * 9/5) + 32;
                tempElement.innerHTML = `${Math.round(tempF)} °F`;
                isCelsius = false;
            } else {
                // Convert °F to °C
                tempElement.innerHTML = `${Math.round(currentTempCelsius)} °C`;
                isCelsius = true;
            }
        }
    }

    searchbtn.addEventListener("click", () => {
        checkweather(searchbox.value);
    });

    toggleButton.addEventListener("click", toggleTemperature);
});
