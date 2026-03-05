require("dotenv").config();
const express = require("express");
const cors = require("cors");
const calendar = require("./data/calendar2026.json");
const axios = require("axios");


const app = express();
app.use(cors());
app.use(express.static(__dirname));

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get("/api/calendar", (req, res) => {
  res.json(calendar);
});

app.get("/api/next", async (req, res) => {
  try{
    const nå = new Date();
    let nesteLøp = null;
    let valgtEvent = null;

    calendar.events.forEach(event => {
      Object.entries(event.sessions).forEach(([øktNavn, øktData]) => {
        const øktTid = new Date(`${øktData.date}T${øktData.time}:00`);

        if(øktTid > nå){
          if(!nesteLøp || øktTid < nesteLøp.fullTid) {
            nesteLøp = {
              name: event.name, 
              city: event.city, 
              øktNavn: øktNavn,
              sessionsinfo1: øktData.date, 
              sessionsinfo2: øktData.time,
              fullTid: øktTid
            };
            valgtEvent = event;
          }
        }
      });
    });

    if(!nesteLøp) return res.json({message :"Det er ingen flere løp i 2026"});

const city = encodeURIComponent(valgtEvent.city);
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${valgtEvent.country}&units=metric&appid=${WEATHER_API_KEY}&lang=no`;
const weatherResponse = await axios.get(weatherURL);
const w = weatherResponse.data;

res.json({
    event: valgtEvent.name,
    session: nesteLøp,
    øktNavn: nesteLøp.øktNavn,
      weather: {
        temp: Math.round(w.main.temp),
        description: w.weather[0].description,
        icon: w.weather[0].icon,
        wind: w.wind.speed
      }
    });

  }catch(error1) {
    console.error("Vær-API har feilet", error1.message);
    res.status(500).json ({
      error: "kunne ikke hente data",
      message: error1.message
    })
  }
});

app.get("/api/drivers", async (req, res) => {
  try {
    const response = await axios.get("https://api.openf1.org/v1/drivers?session_key=latest");
    res.json(response.data);
  } catch (error2) {
    res.status(500).json ({
      error: "kunne ikke hente sjåfør data",
      message: error2.message
    })
  }
});

app.get("/api/driverChampionship", async (req, res) => {
  try{
    const response = await axios.get("https://api.openf1.org/v1/championship_drivers?session_key=latest")
    res.json(response.data);
  } catch (error3) { 
    console.status(500).json ({
      error: "kunne ikke hente champion data",
      message: error3.messagae
    })
  }
});



app.listen(3000, () => {
  console.log("F1 api kjører på => http://localhost:3000/api/next");
  console.log("ÅPNE SIDEN HER: http://127.0.0.1:5500/index.html")
});
