const express = require("express");
const cors = require("cors");
const app = express();
const port = 2323;
const https = require("https");

app.use(cors({ origin: 'https://rowhnn.github.io' })); // your GitHub Pages URL
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "03597192f8ca3c481081503063db0979";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + desc + ".</p>");
      res.write("<h1>The weather of " + query + " is " + temp + " °C.</h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});



// const express = require("express");
// const app = express();

// const port = 2323;

// const https = require("https");

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/", (req, res) => {
//   console.log(req.body.cityName);
//   // console.log("Post request recieved.");

//   const query = req.body.cityName;
//   const apiKey = "03597192f8ca3c481081503063db0979";
//   const unit = "metric";
//   const url =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     query +
//     "&appid=" +
//     apiKey +
//     "&units=" +
//     unit +
//     "";

//   https.get(url, (response) => {
//     console.log(response.statusCode);

//     response.on("data", (data) => {
//       const weatherData = JSON.parse(data);
//       // console.log(weatherData);

//       const temp = weatherData.main.temp;
//       console.log(temp);

//       const desc = weatherData.weather[0].description;
//       console.log(desc);

//       const icon = weatherData.weather[0].icon;
//       const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

//       res.write("<p>The weather is currently " + desc + ".</p>");
//       res.write(
//         "<h1>The weather of " + query + " is  " + temp + " degree Celsius.</h1>"
//       );
//       res.write("<img src = " + iconURL + ">");
//       res.send();
//     });
//   });

//   //   res.send("Server is up and running...");
// });

// app.listen(port, () => {
//   console.log(`Server is running at ${port}`);
// });

