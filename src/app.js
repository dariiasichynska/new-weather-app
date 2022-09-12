// alert("Hello world");
let now = new Date();
let dateTime = document.querySelector("#dateTime");
let date = now.getDate();
let hour = now.getHours();
hour = hour > 9 ? hour : "0" + hour;
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;

let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfTheWeek = weekDay[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
dateTime.innerHTML = ` ${dayOfTheWeek}, ${month} ${date}, ${hour}:${minutes} `;

// function formatDate(timestamp) {
//   let date = new Date(timestamp);
//   console.log(date);
//   let dayOfMonth = date.getDate();
//   console.log(dayOfMonth);
//   let hours = date.getHours();
//   console.log(hours);
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }

//   let minutes = date.getMinutes();
//   console.log(minutes);
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   let weekDay = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = weekDay[date.getDay()];
//   let months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   let month = months[date.getMonth()];
//   return `${day}, ${month} ${dayOfMonth}, ${hours}:${minutes}`;
// }
// Changing backgroundImage depending from time oh the day
// let now = new Date();
// let hour = now.getHours();

switch (true) {
  case 10 <= hour && hour < 18:
    document.getElementById("weather-app").style.backgroundImage =
      "url(day.jpg)";
    break;
  case 5 <= hour && hour < 10:
    document.getElementById("weather-app").style.backgroundImage =
      "url(sunrise.jpg)";
    break;
  case 18 <= hour && hour < 22:
    document.getElementById("weather-app").style.backgroundImage =
      "url(sunset.jpg)";
    break;
  case (0 <= hour && hour < 5) || 22 <= hour:
    document.getElementById("weather-app").style.backgroundImage =
      "url(night.jpg)";
    break;
}
console.log(hour);

function formatWind(direction) {
  switch (true) {
    case 0 <= direction && direction <= 11:
      return `north`;
    case 12 < direction && direction <= 34:
      return `north-northeast`;
    case 34 < direction && direction <= 56:
      return `northeast`;
    case 57 < direction && direction <= 79:
      return `east-northeast`;
    case 80 < direction && direction <= 101:
      return `east`;
    case 102 < direction && direction <= 123:
      return `east-southeast`;
    case 124 < direction && direction <= 146:
      return `southeast`;
    case 147 < direction && direction <= 168:
      return `south-southeast`;
    case 169 < direction && direction <= 191:
      return `south`;
    case 192 < direction && direction <= 213:
      return `south-southwest`;
    case 214 < direction && direction <= 236:
      return `southwest`;
    case 237 < direction && direction <= 258:
      return `west-southwest`;
    case 259 < direction && direction <= 281:
      return `west`;
    case 282 < direction && direction <= 303:
      return `west-northwest`;
    case 304 < direction && direction <= 326:
      return `northwest`;
    case 327 < direction && direction <= 348:
      return `north-northwest`;
    case 349 < direction && direction <= 360:
      return `north`;
    default:
      `direction is not defined`;
      break;
  }
}

function displayApiResults(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind-power");
  windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = windSpeed;
  console.log(`Current wind speed: ${windSpeed} km/h`);
  let windDirectionElement = document.querySelector("#wind-direction");
  if (windSpeed > 0) {
    windDirectionElement.innerHTML = formatWind(response.data.wind.deg);
  } else {
    windDirectionElement.innerHTML = null;
  }
  // не отображает направление ветра, если скорость ветра = 0.

  let iconID = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `openweathermap/${iconID}.svg`);
  displayCelsiusTemperature();
  // let dateElement = document.querySelector("#dateTime");
  // dateElement.innerHTML = formatDate(response.data.dt * 1000);
  // - I don't like this way because
  // time is not updated correctly, constantly
  // a delay of 10 minutes. This is probably due to the frequency of updating dt in the API
}

function search(cityName) {
  let apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayApiResults);
}

function handleInput(event) {
  event.preventDefault();
  // let milesSpeedHandler = windSpeed;
  // let metricSpeed = document.querySelector("#wind-power");
  // metricSpeed.innerHTML = milesSpeedHandler;
  let cityInputElement = document.querySelector("#city-imput");
  search(cityInputElement.value.trim());
}
function displayFahrenheitTemperature() {
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}
function displayFahrenheitTemperatureHandler(event) {
  event.preventDefault();
  displayFahrenheitTemperature();
}
function displayCelsiusTemperature() {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayCelsiusTemperatureHandler(event) {
  event.preventDefault();
  displayCelsiusTemperature();
}

function showActualWeather() {
  navigator.geolocation.getCurrentPosition(getWeatherForLocation);
}
function getWeatherForLocation(position) {
  console.log(position);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
  apiCoordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiCoordUrl).then(displayApiResults);
}

function displayImperialSpeed(event) {
  event.preventDefault();
  document.getElementById("imperial-units-speed").style.visibility = "visible";
  document.getElementById("metric-units-speed").style.visibility = "hidden";
  let windSpeedInMph = Math.round(windSpeed / 1.609);
  console.log(`Current wind speed: ${windSpeedInMph} mph`);
  let imperialSpeed = document.querySelector("#wind-power");
  imperialSpeed.innerHTML = windSpeedInMph;
}

function displayMetricSpeed(event) {
  event.preventDefault();
  document.getElementById("metric-units-speed").style.visibility = "visible";
  document.getElementById("imperial-units-speed").style.visibility = "hidden";
  let windSpeedInKmh = windSpeed;
  let metricSpeed = document.querySelector("#wind-power");
  metricSpeed.innerHTML = windSpeedInKmh;
}

let celsiusTemperature = null;
let windSpeed = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleInput);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperatureHandler);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperatureHandler);

let metricUnit = document.querySelector("#metric-units-speed");
metricUnit.addEventListener("click", displayImperialSpeed);

let imperialUnit = document.querySelector("#imperial-units-speed");
imperialUnit.addEventListener("click", displayMetricSpeed);
