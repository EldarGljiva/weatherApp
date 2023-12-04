import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const apiKey = "47546d907fcbde5d30208c7919a13817";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;
console.log(currentDate);

app.post("/showWeather", async (req, res) => {
  try {
    const cityName = req.body.city;
    const result = await axios.get(API_URL + `${cityName}`, {
      params: { appid: apiKey },
    });
    res.render("index.ejs", {
      content: result.data,
      currentDate,
    });
    console.log(result.data);
  } catch (error) {
    const cityNotFound = "I am used just to display error message";
    console.error("Error fetching weather data:", error.message);
    res.render("index.ejs", {
      cityNotFound: cityNotFound,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
