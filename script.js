const apiKey = "3db16a74fd7b920999c7361e7a46b17f";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");
const error = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        error.textContent = "Please enter a city name!";
        return;
    }

    error.textContent = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        city.textContent = data.name;
        temperature.textContent = `🌡 Temperature: ${data.main.temp} °C`;
        humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
        wind.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;
        description.textContent = `☁ Weather: ${data.weather[0].description}`;

    } catch (err) {
        error.textContent = err.message;
    }
}