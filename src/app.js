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
  axios.get(apiUrl).then(showWeather); 
  changeMetricUnit.classList.remove("active");
  showForecast();
}
function showWeather(response){
  console.log(response);
  cityPlaceholder.innerHTML= response.data.name;
 let currentTemp=document.querySelector("#current-temp");
  currentTemp.innerHTML= `${Math.round(response.data.main.temp)}`;
 let currentDescription= document.querySelector("#current-description");
currentDescription.innerHTML=`${response.data.weather[0].description}`;
}
function showForecast(response){
  console.log(response);
  let days=["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
  let day=days[now.getDay()];
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML= 
  `<div class="row day-one">
            <div class="col-3 day-col">
                ${day}
            </div>
            <div class="col-3 icon-col">
                ☀️
            </div>
            <div class="col-3 hi-col">
                ${Math.round(response.data.list[4].main.temp)}°
            </div>
        </div>
        <div class="row day-two">
            <div class="col-3 day-col">
                    ${day}
            </div>
            <div class="col-3 icon-col">
                    ☀️
            </div>
            <div class="col-3 hi-col">
                    ${Math.round(response.data.list[12].main.temp)}°
             </div>
     </div>
    <div class="row day-three">
        <div class="col-3 day-col">
             ${day}
          </div>
        <div class="col-3 icon-col">
             ☀️
         </div>
         <div class="col-3 hi-col">
              ${Math.round(response.data.list[20].main.temp)}° 
        </div>
    </div>
    <div class="row day-four">
        <div class="col-3 day-col">
            ${day}
        </div>
        <div class="col-3 icon-col">
            ☀️
        </div>
        <div class="col-3 hi-col">
            ${Math.round(response.data.list[28].main.temp)}°
        </div>
    </div>
    <div class="row day-five">
        <div class="col-3 day-col">
            ${day}
        </div>
        <div class="col-3 icon-col">
            ☀️
        </div>
        <div class="col-3 hi-col">
            ${Math.round(response.data.list[36].main.temp)}°
        </div>
    </div>
    </div>`;
}

let cityPlaceholder = document.querySelector("h1");
let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;
axios.get(apiUrl).then(showWeather);

let forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;
axios.get(forecastUrl).then(showForecast);

let citySubmit = document.querySelector("#search");
citySubmit = addEventListener("click", changeCity);
let cityInput = document.querySelector("#cityform");

function metricUnit(event){
event.preventDefault();
let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showWeather);
let forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityPlaceholder.innerHTML}&units=metric&appid=${apiKey}`;
axios.get(forecastUrl).then(showForecast);
changeMetricUnit.classList.add("active");
changeImpUnit.classList.remove("active");
}
function impUnit(event){
event.preventDefault();
let apiKey=`2ab0b590fd9866ef804df5849d5ef74a`;
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;
axios.get(apiUrl).then(showWeather);
let forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;
axios.get(forecastUrl).then(showForecast);
changeImpUnit.classList.add("active");
changeMetricUnit.classList.remove("active");
}
let changeMetricUnit= document.querySelector("#celsiuslink");
changeMetricUnit.addEventListener("click", metricUnit);
let changeImpUnit= document.querySelector("#farenheitlink");
changeImpUnit.addEventListener("click",  impUnit);

function changeToGeolocation(position){
  console.log (position);
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let apiKey="2ab0b590fd9866ef804df5849d5ef74a";
  let geolocationUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  let forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityPlaceholder.innerHTML}&units=imperial&appid=${apiKey}`;

  changeMetricUnit.classList.remove("active");
  changeImpUnit.classList.add("active");
  axios.get(geolocationUrl).then(showWeather);   
  axios.get(forecastUrl).then(showForecast);
}
function geoClick(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(changeToGeolocation);
}
let currentPosition=document.querySelector("#currentlocation");
currentPosition.addEventListener("click", geoClick);