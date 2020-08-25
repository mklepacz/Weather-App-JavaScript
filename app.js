//--
const weather = {};
weather.temperature = {
    unit : "celcius"
}
const api = {
    key : "d0f1b57d4b9147c286a4c45f1f0332c3",
    kelvin : 273
};
//--
const informationElement = document.querySelector(".app-container__information");
const iconElement = document.querySelector(".app-container__weather-icon");
const temperatureElement = document.querySelector(".app-container__temperature-value p");
const descriptionElement = document.querySelector(".app-container__description p");
const windElement = document.querySelector(".app-container__wind p");
const locationElement = document.querySelector(".app-container__location p");

if (!navigator.geolocation) {
    informationElement.innerHTML = "<p>Your brpwser don't support geolocation :(</p>";
  } else {
    navigator.geolocation.getCurrentPosition(getPossition, showError);
  }
  
function getPossition(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  }

function showError(error) {
    informationElement.innerHTML = '<p>'+error.message+'</p>';
  }

function getWeather(latitude, longitude){
  let getData = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+api.key;
  catchData(getData)
  .then( (data) => {
    
  weather.temperature.value = Math.floor(data.main.temp - api.kelvin);
  weather.city = data.name;
  weather.country = data.sys.country;
  weather.wind = data.wind.speed;
  weather.description = data.weather[0].description;
  weather.icon = data.weather[0].icon;
  console.log(weather);
  })
  .then( () => {
    showWeather();
  })
  .catch(error => {
    informationElement.innerHTML = error;
  })
}

async function catchData (getData){
  const response = await fetch (getData);
  const data = await response.json();
  return data;
}

function showWeather(){
  temperatureElement.innerHTML = weather.temperature.value+' °C';
  iconElement.innerHTML = '<img src="img/'+weather.icon+'.png"/>';
  descriptionElement.innerHTML = 'Opis: '+weather.description
  locationElement.innerHTML = 'Miejscowość: '+weather.city +' ,'+weather.country;
  windElement.innerHTML = 'Wiatr: '+weather.wind +' m/s';
}

function celciusTofahrenheit (temperature){
  return weather.temperature.value * 1.8 + 32;
}

temperatureElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;
  if (weather.temperature.unit === "celcius"){
    let fahrenheit = Math.floor(celciusTofahrenheit(weather.temperature.value));
    temperatureElement.innerHTML = fahrenheit+' F';
    weather.temperature.unit = "fahrenheit";
  }
  else{
    temperatureElement.innerHTML = weather.temperature.value+' °C';
    weather.temperature.unit = "celcius";
  }

})