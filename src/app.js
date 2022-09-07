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
//   let dayOfMonth = date.getDay();
//   let hours = date.getHours();
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   let minutes = date.getMinutes();
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
    case 0 < direction < 11:
      return `north`;
    case 349 < direction < 360:
      return `north`;
    case 12 < direction < 34:
      return `north-northeast`;
    case 34 < direction < 56:
      return `northeast`;
    case 57 < direction < 79:
      return `east-northeast`;
    case 80 < direction < 101:
      return `east`;
    case 102 < direction < 123:
      return `east-southeast`;
    case 124 < direction < 146:
      return `southeast`;
    case 147 < direction < 168:
      return `south-southeast`;
    case 169 < direction < 191:
      return `south`;
    case 192 < direction < 213:
      return `south-southwest`;
    case 214 < direction < 236:
      return `southwest`;
    case 237 < direction < 258:
      return `west-southwest`;
    case 259 < direction < 281:
      return `west`;
    case 282 < direction < 303:
      return `west-northwest`;
    case 304 < direction < 326:
      return `northwest`;
    case 327 < direction < 348:
      return `north-northwest`;
  }
}

function displayApiResults(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-power");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let windDirectionElement = document.querySelector("#wind-direction");
  windDirectionElement.innerHTML = formatWind(response.data.wind.deg);

  // let dateElement = document.querySelector("#dateTime");
  // dateElement.innerHTML = formatDate(response.data.dt * 1000); - мне не нравится этот способ потому что
  // время обновляется некорректно, постояннор с
  // задержкой 10 минут и 4 дня. Наверное это из-за частоты обновления dt в API
  // let iconElement = document.querySelector("#icon");
}

let apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
let cityName = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayApiResults);
