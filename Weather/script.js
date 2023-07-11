const apiKey = '87a3c2a2f98e43a8220b057a9dd263bf';

const weatherForm = document.getElementById('weatherForm');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value.trim();
  getWeather(cityName);
  cityInput.value = '';
});


function getWeather(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.log('Error:', error);
      displayErrorMessage();
    });
}


function displayWeather(data) {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${parseInt(data.main.temp)}°C</p>
    <p>Description: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}


function displayErrorMessage() {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `<p>Failed to fetch weather data.</p>`;
}