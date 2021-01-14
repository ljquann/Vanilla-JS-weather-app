let now=new Date();
let ft = now.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
});
let hour=now.getHours();
let minute=now.getMinutes();

if (hour<=6||  hour>=18){
    document.write(`<body style="background:rgba(119,109,138, 0.6);">`);
    document.write(`<div class=sun-moon style="border: 125px solid #cfd3ce;">`)
  }

function currentDay(date){
let days=["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
let day=days[now.getDay()];
  return `${day}`;
}
function dateAndTime(date){
  let months=["January", "February", "March","April", "May", "June", "July", "August", "Spetember", "October", "November", "December"];
  let month=months[now.getMonth()];
  let dayOfMonth=now.getDate();
  let year=now.getFullYear();
  return `${month} ${dayOfMonth}, ${year } <br /> ${ft}`;
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
  let forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityPlaceholder}&units=imperial&appid=${apiKey}`;
  axios.get(forecastUrl).then(showForecast);
  changeMetricUnit.classList.remove("active");
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
  day=days[now.getDay()];
 let dayOne=new Date(response.data.list[4].dt_txt);
gotDayOne=days[dayOne.getDay()];

 let dayTwo=new Date(response.data.list[12].dt_txt);
gotDayTwo=days[dayTwo.getDay()];

 let dayThree=new Date(response.data.list[20].dt_txt);
gotDayThree=days[dayThree.getDay()];

 let dayFour=new Date(response.data.list[28].dt_txt);
gotDayFour=days[dayFour.getDay()];

 let dayFive=new Date(response.data.list[36].dt_txt);
gotDayFive=days[dayFive.getDay()];

  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML= 
  `<div class="row day-one">
            <div class="col-3 day-col">
                ${gotDayOne}
            </div>
            <div class="col-3 icon-col">
                <img src="http://openweathermap.org/img/wn/${response.data.list[4].weather[0].icon}@2x.png">
            </div>
            <div class="col-3 hi-col">
                ${Math.round(response.data.list[4].main.temp)}°
            </div>
        </div>
        <div class="row day-two">
            <div class="col-3 day-col">
                    ${gotDayTwo}
            </div>
            <div class="col-3 icon-col">
                    <img src="http://openweathermap.org/img/wn/${response.data.list[12].weather[0].icon}@2x.png">
            </div>
            <div class="col-3 hi-col">
                    ${Math.round(response.data.list[12].main.temp)}°
             </div>
     </div>
    <div class="row day-three">
        <div class="col-3 day-col">
             ${gotDayThree}
          </div>
        <div class="col-3 icon-col">
             <img src="http://openweathermap.org/img/wn/${response.data.list[20].weather[0].icon}@2x.png">
         </div>
         <div class="col-3 hi-col">
              ${Math.round(response.data.list[20].main.temp)}° 
        </div>
    </div>
    <div class="row day-four">
        <div class="col-3 day-col">
            ${gotDayFour}
        </div>
        <div class="col-3 icon-col">
            <img src="http://openweathermap.org/img/wn/${response.data.list[28].weather[0].icon}@2x.png">
        </div>
        <div class="col-3 hi-col">
            ${Math.round(response.data.list[28].main.temp)}°
        </div>
    </div>
    <div class="row day-five">
        <div class="col-3 day-col">
            ${gotDayFive}
        </div>
        <div class="col-3 icon-col">
            <img src="http://openweathermap.org/img/wn/${response.data.list[36].weather[0].icon}@2x.png">
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
citySubmit = addEventListener("submit", changeCity);
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
  let forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
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