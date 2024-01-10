const timE=document.getElementById("time");
const datE=document.getElementById("date");
const currWeatherItems=document.getElementById("current-weather-items");
const timezone=document.getElementById("time-zone");
const country=document.getElementById("country");
const weatherForecast=document.getElementById("weather-forecast");
const currTemp=document.getElementById("current-temp");

const days=['Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat'];
const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'];
setInterval(() =>{
  const time=new Date();
  const month=time.getMonth();
  const date=time.getDate();
  const day=time.getDay();
  const hour=time.getHours();
  const hoursFormatted=hour>=13?hour%12:hour
  const minute=time.getMinutes();
  const ampm=hour>=12?'PM':'AM';
  timE.innerHTML=hoursFormatted+':'+minute+`<span id="am-pm">${ampm}</span>`
  datE.innerHTML=days[day]+','+date+' '+months[month]
},1000)





var imageNames = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpeg",
  "images/7.jpeg"
];

var currentIndex = 0;
var container = document.querySelector(".container");
var body = document.body;

function changeBackground() {
  if (currentIndex < imageNames.length) {
    var imageUrl = imageNames[currentIndex];
    body.style.background = "url(" + imageUrl + ") no-repeat center center / cover";
    currentIndex++;
  } else {
    currentIndex = 0;
    var imageUrl = imageNames[currentIndex];
    body.style.background = "url(" + imageUrl + ") no-repeat center center / cover";
    body.style.filter = "saturate(7) sepia(100%) contrast(180%)";

    // Используем [0], чтобы обратиться к первому элементу в коллекции
    if (imageUrl === 'imgCSS/1.jpg' || imageUrl === 'imgCSS/4.jpg') {
      container[0].style.color = "red";
    } else {
      container[0].style.color = "";
    }
  }
}

window.addEventListener('load', changeBackground);

setInterval(changeBackground, 7000);





const apiKey = "6814a81120bcae7f51bdf309cea0cce5";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const errorText = document.querySelector(".error");
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    errorText.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    if (data.weather[0].main == "Clear") {
      weatherIcon.className = "fa-solid fa-sun";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.className = "fa-solid fa-cloud-rain";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.className = "fa-solid fa-cloud-mist";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.className = "fa-solid fa-cloud-drizzle";
    }
    weather.style.display = "block";
    errorText.style.display = "none";
  }
}
searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});
//позволяет запускать код на enter
searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13||event.keyCode==32) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});