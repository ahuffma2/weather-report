# Weather Report
This project uses API calls from OpenWeatherMap and OneCallAPI to fetch weather data from various cities in the world, through various means. 

## Overview
![Site Overview](https://github.com/ahuffma2/weather-report/blob/main/assets/img/WeatherReport.JPG)

## Code Overview
This project was fairly simple in terms of logic. There isn't a lot to explain other than I pulled API calls, Checked to make sure they were valid, and then assigned those pulled values to whatver variables I needed displayed. This is the recurring theme in every single method in this set. 

This is a reoccuring code segment that appears with minor tweaks but the idea behind it is to fetch a url, check to see if the resposne is 200. If not, display to the user the various error it could be. Right now it's an Alert but ideally I would show a display or send to another HTML page that lists the error. For sake of time the Alert was sufficient

```
  //checks to see if the call is valid first
  fetch(location)
    .then(function (response) {
      console.log(response.status);
      if (response.status !== 200) {
        //display status to user
        alert(response);
        console.log(response.status);
      }
      return response.json();
    })
    
```

The next "function" I will split into bite sized pieces. This is just an object that made readibility easier by acquiring (most) of the data attributes I needed to assign and setting them as properties to pull from. This may have not been efficient, but it improves readibility. 
```
  .then(function (data) {
      var weatherObject = {
        City: data.name,
        Weather: data.weather[0].icon,
        Temp: data.main.temp,
        Humidity: data.main.humidity,
        Wind: data.wind.speed,
      };
```

I set these lat and lon variables because I ended up having to use them for multiple calls. While I could have added these to the weatherObject, it made the strings of subsequent URL calls shorter thatn writing weatherObject.lat. The following is using jquery to assign the image icon to a url, as the API only supplies you with a string. By concatinating with a url, we can get a direct source to apply it. 
```
      lat = data.coord.lat;
      lon = data.coord.lon;

      var emojiCode = weatherObject.Weather;
      var emojiUrl = "https://openweathermap.org/img/w/" + emojiCode + ".png";
      $("#wEmoji").attr("src", emojiUrl);
```

I then again use jQuery to directly assign the data values to their respective elements with some formatting to make them read better on the user side
```

      $("#main-city").text(weatherObject.City);
      $("#main-temp").text("Temperature: " + weatherObject.Temp + "°");
      $("#main-wind").text("Humidity: " + weatherObject.Humidity + "%");
      $("#main-humid").text("Wind Speed: " + weatherObject.Wind + "mph");
```

This is where I think I could've done better but was at a loss as to what to do to prevent another call.  The OneCall api was the only way to aquire UV Index and a 5 day forcast that wasn't extremely difficult to parse through. The caviat was that they REQUIRED a latitude and longetude value, and I was searching by city. As most people don't know their exact lat-long coordinates, it doenst make sense to search by thsoe parameters, and I couldn't assign them to global variables because A) That's not a great practice and B) With the asychronous nature of fetch calls, you can't assign them globally like that anyways. 

Thus, was born a triple fetch, each with it's own response check
```
      //had to do a second fetch to acquire UVI as it can only take latitude and longitude . Used the previous data to call this one
      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&appid=" + APIKey
      );
    })
```
The last segment is very similar to the previous jQuery assignment, except I am dealing with an array of data, so I simply loop through the correct amount of times and assign variables to the various HTML elements using jQuery. Had to look up documentation on this oneCall api and how it differed from the first API call, but all in all its a simple for loop. 
```
   for (var i = 0;i < 5;i++ ){ //loops through all 5 days, both buttons and api days
 
        weatherCard = $(".w-card-" + (i + 1)); //Appending a number to act as a recognizable id in the loop

        weatherCard
          .children(".Temp")
          .text("Temperature: " + Math.trunc(forecast[i].temp.day) + "°");  //Math.trunc used for elimination of decimals
        weatherCard
          .children(".Wind")
          .text("Wind Speed: " + forecast[i].wind_speed + " mph");
        weatherCard
          .children(".Humidity")
          .text("Humidity: " + forecast[i].humidity + "%");

        var date = moment(forecast[i].dt * 1000).format("MM/DD/YYYY");
        weatherCard.children(".Date").text(date);
```
## Technologies Used
*HTML
*Javascript
*Bootstrap
*JQuery
*OpenWeatherMap API

## Author
[Austin Huffman](https://www.linkedin.com/in/ahuffma2/)
