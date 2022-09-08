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
    case 0 < direction && direction < 11:
      return `north`;
    case 12 < direction && direction < 34:
      return `north-northeast`;
    case 34 < direction && direction < 56:
      return `northeast`;
    case 57 < direction && direction < 79:
      return `east-northeast`;
    case 80 < direction && direction < 101:
      return `east`;
    case 102 < direction && direction < 123:
      return `east-southeast`;
    case 124 < direction && direction < 146:
      return `southeast`;
    case 147 < direction && direction < 168:
      return `south-southeast`;
    case 169 < direction && direction < 191:
      return `south`;
    case 192 < direction && direction < 213:
      return `south-southwest`;
    case 214 < direction && direction < 236:
      return `southwest`;
    case 237 < direction && direction < 258:
      return `west-southwest`;
    case 259 < direction && direction < 281:
      return `west`;
    case 282 < direction && direction < 303:
      return `west-northwest`;
    case 304 < direction && direction < 326:
      return `northwest`;
    case 327 < direction && direction < 348:
      return `north-northwest`;
    case 349 < direction && direction < 360:
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
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = windSpeed;
  if (windSpeed > 0) {
    let windDirectionElement = document.querySelector("#wind-direction");
    windDirectionElement.innerHTML = formatWind(response.data.wind.deg);
  }
  // не отображает направление ветра, если скорость ветра = 0.

  let iconID = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `openweathermap/${iconID}.svg`);

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
  let cityInputElement = document.querySelector("#city-imput");
  search(cityInputElement.value);
}
// function showPosition(position) {
//   let h2 = document.querySelector("#city-imput");
//   h2.innerHTML = `Your latitude is ${position.coords.latitude} and longitude is ${position.coords.longitude}`;
// }

// function getCurrentPosition() {
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleInput);

let fahrenheitConverter = document.querySelector("#fahrenheit-link");
fahrenheitConverter.addEventListener("click", displayFahrenheitTemperature);

let celsiusConverter = document.querySelector("#celsius-link");
celsiusConverter.addEventListener("click", displayCelsiusTemperature);
search("London");
