const { log } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/" , function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "05ac46a8e22165b060ad8e987025d878";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;

    https.get(url , function(apiResponse){
        console.log(apiResponse.statusCode);

        apiResponse.on("data" , function(data){
            const apiData = JSON.parse(data);
            const temp = apiData.main.temp;
            const feelsLike = apiData.main.feels_like;
            const weatherDesc = apiData.weather[0].main;
            const humidity = apiData.main.humidity;
            const windSpeed = apiData.wind.speed;

            res.render("weather",{
                city : query,
            
                temparature : temp,
            
                feelsLikeTemp : feelsLike,
            
                description : weatherDesc,
            
                humid : humidity,
            
                speedOfWind : windSpeed
            })

        })
    })

})


app.listen(3000, function(){
    console.log("Server has successfully started at port 3000");
})