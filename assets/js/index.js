var austinBtn = document.getElementById('austinBtn')
var APIKey = "acf5cae1c94cfb7dfd80656854710bd9";

 


function getWeatherAPI(city){
    var location = "https://api.openweathermap.org/data/2.5/weather?id=" + city +"&units=imperial&appid="+ APIKey;
    fetch(location)
        .then(function (response) {
        console.log(response.status);
        if(response.status !== 200){ //MIGHT SPECIFICALLY DO 404 ERROR
            //display status to user 
            console.log(response.status);
        }
        return response.json();
    })
    .then(function(data) {
        console.log("Weather: " + data.weather[0].main); //THIS GRABS THE TPYE OF WEATHER
       // console.log(data.coord); //I WILL NEED THIS FOR UV
        console.log("Tempurature: " + data.main.temp + "°");
        console.log("Humidity: " + data.main.humidity + "%");
        console.log("Wind: " + data.wind.speed + "mph");
        //return data.coord();
    });

}

// document.getElementById(header).textContent = grabAPI("https://api.openweathermap.org/data/2.5/weather?id=6167865&appid="+ APIKey).toString();

austinBtn.addEventListener('click',getWeatherAPI(6167865));