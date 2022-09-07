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

// function formatIcon(ID) {
//   switch (true) {
//     case (ID = `01d`):
//       return (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
//           <defs>
//             <linearGradient
//               id="a"
//               x1="26.75"
//               x2="37.25"
//               y1="22.91"
//               y2="41.09"
//               gradientUnits="userSpaceOnUse"
//             >
//               <stop offset="0" stop-color="#fbbf24" />
//               <stop offset=".45" stop-color="#fbbf24" />
//               <stop offset="1" stop-color="#f59e0b" />
//             </linearGradient>
//           </defs>
//           <circle
//             cx="32"
//             cy="32"
//             r="10.5"
//             fill="url(#a)"
//             stroke="#f8af18"
//             stroke-miterlimit="10"
//             stroke-width=".5"
//           />
//           <path
//             fill="none"
//             stroke="#fbbf24"
//             stroke-linecap="round"
//             stroke-miterlimit="10"
//             stroke-width="3"
//             d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"
//           >
//             <animateTransform
//               attributeName="transform"
//               dur="45s"
//               repeatCount="indefinite"
//               type="rotate"
//               values="0 32 32; 360 32 32"
//             />
//           </path>
//         </svg>
//       );
//       break;

//     default:
//       `Sorry, the weather is not defined`;
//       break;
//   }
// }

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
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = windSpeed;
  if (windSpeed > 0) {
    let windDirectionElement = document.querySelector("#wind-direction");
    windDirectionElement.innerHTML = formatWind(response.data.wind.deg);
  }

  let iconType = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `openweathermap/${iconType}.svg`);

  // let dateElement = document.querySelector("#dateTime");
  // dateElement.innerHTML = formatDate(response.data.dt * 1000); - мне не нравится этот способ потому что
  // время обновляется некорректно, постояннор с
  // задержкой 10 минут и 4 дня. Наверное это из-за частоты обновления dt в API
}

let apiKey = "ebfc1f6824f703866321e99d5ec95eb7";
let cityName = "Sydney";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayApiResults);
