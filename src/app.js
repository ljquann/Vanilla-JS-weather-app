let now=new Date();

function currentDay(date){
let days=["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
let day=days[now.getDay()];
  return `${day}`;
}
function dateAndTime(date){
 let hour=now.getHours();
  if (hour <10){
    hour=`0${hour}`;
  }
let minute=now.getMinutes();
  if (minute<10){
    minute=`0${minute}`;
  }
  let months=["January", "February", "March","April", "May", "June", "July", "August", "Spetember", "October", "November", "December"];
  let month=months[now.getMonth()];
  let dayOfMonth=now.getDate();
  let year=now.getFullYear();
  return `${month} ${dayOfMonth}, ${year } ${hour}:${minute}`;
}
let dayOfWeek=document.querySelector("#current-day");
dayOfWeek.innerHTML=currentDay(now);
let dayAndTime=document.querySelector("#date-time");
dayAndTime.innerHTML=dateAndTime(now);

function changeCity(event) {
  event.preventDefault();
  let cityPlaceholder = `${cityInput.value}`;
  let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather) ; 
}
function showWeather(response){
  console.log(response);
  cityPlaceholder.innerHTML= response.data.name;
  document.querySelector("#current-temp").innerHTML= `${Math.round(response.data.main.temp)}`;
  document.querySelector("#current-description").innerHTML=`${response.data.weather[0].description}`
}
let cityPlaceholder = document.querySelector("h1");
let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;
axios.get(apiUrl).then(showWeather);

let citySubmit = document.querySelector("#search");
citySubmit = addEventListener("click", changeCity);
let cityInput = document.querySelector("#cityform");

function metricUnit(event){
  event.preventDefault();
  let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
  let metricUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=metric&appid=${apiKey}`;
  axios.get(metricUrl).then(changeUnitToC) ; 
}
function changeUnitToC(response){
document.querySelector("#current-temp").innerHTML= `${Math.round(response.data.main.temp)}`;
}
let changeMetricUnit= document.querySelector("#celsiuslink");
changeMetricUnit.addEventListener("click", metricUnit);

function impUnit(event){
  event.preventDefault();
  let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
  let impUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;
  axios.get(impUrl).then(changeUnitToF) ; 
}
function changeUnitToF(response){
  document.querySelector("#current-temp").innerHTML= `${Math.round(response.data.main.temp)}`;
}
let changeImpUnit= document.querySelector("#farenheitlink");
changeImpUnit.addEventListener("click", impUnit);

function changeToGeolocation(position){
  console.log (position);
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let apiKey="2ab0b590fd9866ef804df5849d5ef74a";
  let geolocationUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(geolocationUrl).then(showWeather);   
}

function geoClick(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(changeToGeolocation);
}
let currentPosition=document.querySelector("#currentlocation");
currentPosition.addEventListener("click", geoClick);