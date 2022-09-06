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

function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].main;
}

let apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
// let cityName = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
