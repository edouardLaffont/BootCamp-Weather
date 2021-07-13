const api = {
    key: "020b7224f26f6cd40f212086d96f1b8a",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    console.log(weather.weather[0].main);
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let tempIcon = document.getElementById("temp-icon");
    const id = weather.weather[0].id;
    if (id<250){
      tempIcon.src = './icons/storm.svg' ;
    }
    else if (id<350){
      tempIcon.src = './icons/drizzle.svg' ;
    }
    else if (id<550){
      tempIcon.src = './icons/rain.svg' ;
    }
    else if (id<650){
      tempIcon.src = './icons/snow.svg' ;
    }
    else if (id<800){
      tempIcon.src = './icons/atmosphere.svg' ;
    }
    else if (id===800){
      tempIcon.src = './icons/sun.svg' ;
    }
    else if(id>800){
      tempIcon.src = './icons/clouds.svg' ;
    }
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }