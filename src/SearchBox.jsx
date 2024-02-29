import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function SearchBox() {
  let [searchInput, setSearchInput] = useState("");
  let [error, setError] = useState(false);

  let [weatherData, setWeatherData] = useState({
    city: "",
    temp: 0,
    feels_like: "",
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    wind_speed: 0,
    weather: "",
  });
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "185618962fbcebef13bd54ea3f953bd1";
  let limit = 1;

  let getWeatherInfo = async (searchInput) => {
    try {
      let response = await fetch(
        `${apiUrl}?q=${searchInput}&limit=${limit}&appid=${apiKey}&units=imperial`
      );
      let jsonResponse = await response.json();
      // console.log(jsonResponse);
      let result = {
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        feels_like: jsonResponse.main.feels_like,
        temp_min: jsonResponse.main.temp_min,
        temp_max: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        pressure: jsonResponse.main.pressure,
        wind_speed: jsonResponse.wind.speed,
        weather: jsonResponse.weather[0].description,
      };
      // console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  };
  let updateWeatherInfo = async (result) => {
    setWeatherData(result);
    // console.log(weatherData);
  };

  let inputHandler = (event) => {
    setSearchInput(event.target.value);
  };
  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log(searchInput);
      setSearchInput("");
      let info = await getWeatherInfo(searchInput);
      updateWeatherInfo(info);
    } catch {
      setError(true);
    }
  };
  useEffect(() => {
    if (searchInput == "") {
      setWeatherData({
        city: "London",
        temp: 50,
        feels_like: 42,
        temp_min: 35,
        temp_max: 53,
        pressure: 1008,
        humidity: 23,
        wind_speed: 20.16,
        weather: "Looks Cloudy",
      });
    }
  }, []);
  let Cold_URL =
    "https://images.unsplash.com/photo-1514632595-4944383f2737?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let Hot_URL =
    "https://images.unsplash.com/photo-1447601932606-2b63e2e64331?q=80&w=2779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  let Rain_URL =
    "https://images.unsplash.com/photo-1599806112354-67f8b5425a06?q=80&w=2785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="search-box">
      <h4>Search for the weather</h4>

      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="Search city"
          variant="outlined"
          value={searchInput}
          onChange={inputHandler}
          required
        />
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
        {error && (
          <p style={{ color: "red" }}>No such place exists in our API</p>
        )}
      </form>

      <br />
      <br />
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={
            weatherData.humidity > 90
              ? Rain_URL
              : weatherData.temp < 40
              ? Cold_URL
              : Hot_URL
          }
          title="Weather Icon"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {weatherData.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Temperature: {weatherData.temp}&deg;F
            <br />
            Min Temp: {weatherData.temp_min}&deg;F
            <br />
            Max Temp: {weatherData.temp_max}&deg;F
            <br />
            Humidity: {weatherData.humidity}
            <br />
            Pressure: {weatherData.pressure} Hg
            <br />
            Wind Speed: {weatherData.wind_speed} m/hr
            <br />
            The weather can be described as {weatherData.weather} and it feels
            like {weatherData.feels_like}&deg;F
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}
