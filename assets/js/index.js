var getWeatherBtn = $('.weatherBtn');
var APIKey = "acf5cae1c94cfb7dfd80656854710bd9";

function getWeatherAPI(city){
    var location = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+ APIKey +"&units=imperial";
    //checks to see if the call is valid first
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
        var weatherObject = {
            City: data.name, 
            Weather: data.weather[0].icon, 
            Temp: data.main.temp, 
            Humidity: data.main.humidity, 
            Wind: data.wind.speed 
        };

        var emojiCode= weatherObject.Weather;
        var emojiUrl = "https://openweathermap.org/img/w/"+ emojiCode + ".png";
        $('#wEmoji').attr('src',emojiUrl);

        $("#main-city" ).text(weatherObject.City);
        $("#main-temp").text("Temperature: " + weatherObject.Temp);
        $("#main-wind").text("Humidity: " + weatherObject.Humidity + "%");;
        $("#main-humid").text("Wind Speed: " + weatherObject.Wind + "mph");;

        //had to do a second fetch to acquire UVI as it can only take latitude and longitude . Used the previous data to call this one
        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&exclude=minutely,hourly,daily,alerts&appid=" + APIKey);  
    })
    .then(function(response){
        if(response.status !== 200){ 
            //NEED TO DISPLAY RESPONSE IF FAILS
            console.log(response.status);
        }
        return response.json();      
    })
    .then (function(uvData){
        $('#main-uv').text("UV Index: " + uvData.current.uvi);
        return;
    });
}

function getForecast(city){
    var location = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid="+ APIKey +"&units=imperial";
    //checks to see if the call is valid first
    fetch(location)
        .then(function (response) {
        console.log(response.status);
        if(response.status !== 200){ //MIGHT SPECIFICALLY DO 404 ERROR
            //display status to user 
            console.log(response.status);
        }
        return response.json();
    })
    
getWeatherBtn.click(function(){
    getWeatherAPI($(this).text()); //Passes the name of the button (City Name)
});



