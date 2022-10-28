// alert("Hello world");
let now = new Date();

document.querySelector("#dateTime").innerHTML = formatTime(now);
displayBackground(now.getHours());

function formatTime(dateTime) {
  let date = dateTime.getDate();
  let hour = dateTime.getHours();
  hour = hour > 9 ? hour : "0" + hour;
  let minutes = dateTime.getMinutes();
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
  let dayOfTheWeek = weekDay[dateTime.getDay()];

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
  let month = months[dateTime.getMonth()];
  return ` ${dayOfTheWeek}, ${month} ${date}, ${hour}:${minutes} `;
}

function displayBackground(hour) {
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
}

function getForecast(coords) {
  console.log(coords);
  let apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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
  let timeZone = response.data.timezone;
  var date = new Date();

  var now_utc = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
  console.log(now_utc.getTimezoneOffset());
  let localDateTime = new Date(
    now_utc.getTime() + timeZone * 1000 + now_utc.getTimezoneOffset() * 60000
  );

  console.log(localDateTime);
  document.querySelector("#dateTime").innerHTML = formatTime(localDateTime);
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
  document.getElementById("metric-units-speed").style.visibility = "visible";
  document.getElementById("imperial-units-speed").style.visibility = "hidden";
  console.log(`Current wind speed: ${windSpeed} km/h`);
  let windDirectionElement = document.querySelector("#wind-direction");
  if (windSpeed > 0) {
    windDirectionElement.innerHTML = formatWind(response.data.wind.deg);
  } else {
    windDirectionElement.innerHTML = null;
  }
  // wind direcrion is not available if wind speed = 0.

  let iconID = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `openweathermap/${iconID}.svg`);
  displayCelsiusTemperature();
  getForecast(response.data.coord);
  // let dateElement = document.querySelector("#dateTime");
  // dateElement.innerHTML = formatDate(response.data.dt * 1000);
  // - I don't like this way because
  // time is not updated correctly, constantly
  // a delay of 10 minutes. This is probably due to the frequency of updating dt in the API
}

function search(cityName) {
  let apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayApiResults);
  console.log(apiUrl);
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
  // for (let index = 0; index <= 7; index++) {
  //   let forecastFahrenheitTempMax = document.getElementById(
  //     `#forecast-temp-max-${index}`
  //   );
  //   let forecastFahrenheitTempMin = document.getElementById(
  //     `#forecast-temp-min-${index}`
  //   );
  //   console.log(`${forecastFahrenheitTempMax}`, `${forecastFahrenheitTempMin}`);
  // }
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

function getForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDay[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.slice(0, 4).forEach(function (forecastDay, index) {
    let maxTemp = Math.round(forecastDay.temp.max);
    let minTemp = Math.round(forecastDay.temp.min);
    let iconID = forecastDay.weather[0].icon;
    // let iconElement = document.querySelector("#forecastIcon");
    // console.log(iconID);
    // iconElement.setAttribute("src", `openweathermap/${iconID}.svg`);

    // 🔻 "forecastHTML += "  is the same as "forecastHTML = forecastHTML + "
    forecastHTML += `
              <div class="col-3">
                <img
                  class="opNLj"
                  src="openweathermap/${iconID}.svg"
                  alt="🤟"
                  loading="lazy"
                  id="forecastIcon"
                />
                <div class="forecast-temperature">
                  <span class="forecast-temp-max" id="forecast-temp-max-${index}">${maxTemp}°</span>
                  <span class="forecast-temp-min" id="forecast-temp-min-${index}">${minTemp}°</span>
                </div>
                <div class="forecast-date">${getForecastDay(
                  forecastDay.dt
                )}</div>
                
              </div>

            `;
  });
  // for (let i = 0; i <= 5; i = i + 1) {
  //   forecastHTML =
  //     forecastHTML +
  //     `
  //             <div class="col">
  //               <div class="forecast-date">${days[i]}</div>
  //               <img
  //                 class="opNLj"
  //                 src="#"
  //                 alt="💮 "
  //                 loading="lazy"
  //                 id="forecast-icon"
  //               />
  //               <div class="forecast-temperature">
  //                 <span class="forecast-temp-max">20</span>
  //                 <span class="forecast-temp-min">15</span>
  //               </div>
  //             </div>

  //           `;
  // }
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
