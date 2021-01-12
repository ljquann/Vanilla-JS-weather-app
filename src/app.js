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

