const btn = document.querySelector('.search-btn');
const wrapper = document.querySelector('.wrapper');
const error = document.querySelector('.error');
const result = document.querySelector('.result');
const dateEl = document.querySelector('.date');

// date and time is updating every second
setInterval(function(){
    dateEl.innerHTML = moment().format("ddd, MMMM Do YYYY, hh:mm a");
},1000)

// when clicked on button data will fetched
btn.addEventListener('click', function () {
    const city = document.querySelector('.input-city').value;
    const API_KEY = "1af05b9dd192aed5af70b562a5be890f";
    const unit = "metric";
    if (city == '') {
        wrapper.style.height = "110px";
        error.innerHTML = "*Please Enter City name";
        error.classList.add("fadeIn");
    } else {
        // fetching data from API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`)
            .then(res => res.json())
            .then(data => {
                if (data.cod === "404") {
                    wrapper.style.height = "110px";
                    result.style.display = "none";
                    result.classList.remove("fadeIn")
                    error.innerHTML = "*Oops! Location not found.";
                    error.classList.add("fadeIn");
                    document.querySelector('.input-city').value = "";
                } else {
                    error.innerHTML = "";
                    // console.log(data)
                    showWeatherData(data);
                }
            }).catch((err) => {
                alert(err);
            });
    }
})

// showing data in the Html
function showWeatherData(data) {
    const {temp, humidity, minTemp, maxTemp} = data.main;
    const {speed} = data.wind;
    const {sunrise, sunset, country} = data.sys;
    const {description, icon} = data.weather[0]

    // Converting Epoch(Unix) time to GMT
    const sunriseGMT = new Date(sunrise * 1000);
    const sunsetGMT = new Date(sunset * 1000);
    const option = { hour: "2-digit", minute: "2-digit" };

    // Initialization of DOM element
    const cityEl = document.querySelector('.city-name');
    const IconEl = document.querySelector('.icon');
    const tempEl = document.querySelector('.temp');
    const descTempEl = document.querySelector('.desc-temp');
    const sunriseEl = document.querySelector('#sunrise');
    const sunsetEl = document.querySelector('#sunset');
    const windSpeedEl = document.querySelector('#wind-speed');
    const humidityEl = document.querySelector('#humidity');

    // Interacting with Dom 
    cityEl.innerHTML = `${data.name}, ${country}`;
    IconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    tempEl.innerHTML = `${temp.toFixed(1)}&#176C`;
    descTempEl.innerHTML = description;
    sunriseEl.textContent = `${sunriseGMT.toLocaleTimeString([],option)}`;
    sunsetEl.textContent = `${sunsetGMT.toLocaleTimeString([],option)}`;
    windSpeedEl.innerHTML = `${speed.toFixed(1)}m/s`;
    humidityEl.innerHTML = `${humidity}%`;
    
    wrapper.style.height = "500px";
    result.style.display = "block";
    result.classList.add("fadeIn")
}
 
