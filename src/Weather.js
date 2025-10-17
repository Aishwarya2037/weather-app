import { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState(); 
    const [weather, setWeather] = useState();
    const [error, setError] = useState(false);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }
    // https://api.openweathermap.org/data/2.5/weather?q=${city}&lon={lon}&appid={19a8553128890c6f71c12be92eb0e838}
    const fetchWeather = async () => {
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={19a8553128890c6f71c12be92eb0e838}`);
            setWeather(response);
            setError(" ");
        }
        catch(error){
            setError("No such place exists!");
            setWeather("");
        }
    }
    
    const handleWeatherCond = () => {
     return weather.data.main.humidity > 80
       ? RAIN_URL
       : weather.data.main.temp > 50
       ? HOT_URL
       : COLD_URL;
    };

    const HOT_URL = 
    "https://images.unsplash.com/photo-1561473880-3b8b12de0a71?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870";
    const COLD_URL = 
    "https://images.unsplash.com/photo-1612208695882-02f2322b7fee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600";
    const RAIN_URL = 
    "https://plus.unsplash.com/premium_photo-1666717576644-5701d3406840?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFpbnklMjB3ZWF0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600";
    
    console.log(weather, 'weather');

    const handleClick = () => {
        fetchWeather();
    }

  return (
    <div className='weather-container'>
      <h3>Search for the weather</h3>
      <input type="text" placeholder='Enter City Name*' value={city} 
      onChange={handleCityChange} />
      <br></br>
      <button onClick={handleClick}>Get Weather</button>

      {error && <p style={{color: 'red'}}>{error}</p>}
      {weather &&
      <>
        <h1>Weather Info</h1>
        <div className='weather-info'>
          <img src={handleWeatherCond()} alt="Weather" />
          <h2>{weather.data.name}</h2>
          <p>Temperature is <b>{weather.data.main.temp} &deg;f</b></p>
          <p>Humidity is <b>{weather.data.main.humidity}</b></p>
          <p>The weather can be described as<br/><b><i>{weather.data.weather[0].description}</i></b></p>
        </div>
      </>
      }
    </div>
  )
}

export default Weather;
