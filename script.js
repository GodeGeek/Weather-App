let name = document.getElementById('name');
let logo = document.getElementById('logo');
let temp = document.getElementById('temp');
let desc = document.getElementById('description');
let status = document.getElementById('status');

let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humid');
let presure = document.getElementById('presure');
let min_temp = document.getElementById('min-temp');
let max_temp = document.getElementById('max-temp');
let current_temp = document.getElementById('current-temp');
let temp_icon = document.getElementById('temp-icon');
const info_toggle_btn = document.getElementById('info-toggle-btn');
const sideBar = document.getElementById('sideBar');
const settings = document.getElementById('settings');
const toggle_setting_btn = document.getElementById('toggle-setting-btn');


if (sessionStorage.getItem('location') == null){
    const cityName = prompt('Enter City Name');
    const countryCode = prompt('Enter Country Code');
    sessionStorage.setItem('location', JSON.stringify({'cityname' : cityName, 'countryCode' : countryCode}));
    setLocation();
}
else{
    setLocation();
}

function setLocation(){
    let location = JSON.parse(sessionStorage.getItem('location'));
    let cityName = location['cityname'];
    let countryCode = location['countryCode'];
    const apiKey = '05a049e6381c5edbc91bd2481565c45d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}`;
    getCurrentWeather(url);
}


function getCurrentWeather(url){
    fetch(url).then(response => response.json()).then(data => {
        let currentTemp = Math.floor(data['main']['temp'] - 273,15);
        let nameCity = data['name'];
        let weatherIcon = data['weather'][0]['icon']
        name.innerText = nameCity;
        temp.innerText = currentTemp;
        status.innerText = data['weather'][0]['description'];
        clouds.innerText = `${data['clouds']['all']}%`;
        humidity.innerText = `${data['main']['humidity']}%`;
        presure.innerText = `${data['main']['pressure']} md`;
        min_temp.innerText = `${data['main']['temp_min'] - 273,15} C`;
        max_temp.innerText = `${data['main']['temp_max'] - 273,15} C`;
        current_temp.innerText = `${currentTemp} C`;
        logo.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
        

        if (currentTemp <= 10){
            desc.innerText = 'It is very Cold';
            temp_icon.className = 'fas fa-icicles';
        }
        else if (currentTemp <= 20 && currentTemp > 10){
            desc.innerText = "It isn't to Bad";
            temp_icon.className = 'fas fa-snowflake';
        }
        else if(currentTemp <= 25 && currentTemp > 20){
            desc.innerText = 'It is pretty warm today';
            temp_icon.className = 'fas fa-sun';

        }
        else if(currentTemp <= 30 && currentTemp > 25){
            desc.innerText = 'It is pretty hot today';
            temp_icon.className = 'fas fa-sun';
        }
        else if(currentTemp <= 30 && currentTemp < 35){
            desc.innerText = 'It is Hot today';
            temp_icon.className = 'fas fa-sun';
        }
        else if(currentTemp <= 40 && currentTemp > 35){
            desc.innerText = 'It is very HOT today';
            temp_icon.className = 'fas fa-fire-alt';
        }
        else if(currentTemp <= 45 && currentTemp > 40){
            desc.innerText = 'It is insane HOT get in the Shade';
            temp_icon.className = 'fas fa-fire-alt';
        }
    })
}

function changeUnit(){
    let currentTemp = temp.innerText;
    let currentUnit = temp.parentElement.children[1].innerText;

    if (currentUnit == 'C'){
        temp.innerText = (currentTemp *9/5) + 32;
        temp.parentElement.children[1].innerText = 'F';
    }
    else{
        temp.innerText = (currentTemp -32) *5/9;
        temp.parentElement.children[1].innerText = 'C';
}
}

function toggleSideBar(){
    if(sideBar.style.right == '-440px'){
        sideBar.style.right = '0';
        info_toggle_btn.style.right = '490px';
        info_toggle_btn.className = 'fas fa-arrow-right';
    }
    else{
        sideBar.style.right = '-440px';
        info_toggle_btn.style.right = '50px';
        info_toggle_btn.className = 'fas fa-arrow-left';
    }
}

function toggleSettingsBar(){
    if (settings.style.left == '-440px'){
        settings.style.left = '0';
        toggle_setting_btn.style.left = '490px';
        toggle_setting_btn.className = 'fas fa-arrow-left';
    }
    else{
        settings.style.left = '-440px';
        toggle_setting_btn.style.left = '50px';
        toggle_setting_btn.className = 'fas fa-arrow-right';
    }
}

function changeMode(e){
    if(e.target.checked){
        settings.style.backgroundColor = '#333';
        sideBar.style.backgroundColor = '#333';
        sideBar.style.color = '#fff';
        settings.style.color = '#fff';
        document.body.style.color = '#333'

    }
    else{
        settings.style.backgroundColor = '#fff'
        settings.style.color = '#333';
        sideBar.style.backgroundColor = '#fff';
        sideBar.style.color = '#333';
        document.body.style.color = '#fff';
    }
    
}
function changeFont(e){
    document.body.style.fontFamily =  e.target.value;
}
