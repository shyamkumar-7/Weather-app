import React, { useState } from 'react'
import './Weatherapp.css'
import './Error.css'

import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

import cry from '../assets/cry.png'


const  Weatherapp = () => {

    let api_key= "faa74fa71a07f83cc10c5d680a4b1cfb"

    const [wicon,setWicon]= useState(cloud_icon);
    const [error, setError] = useState(null);
    

    const search =async ()=>{
        
        try {
            const element= document.getElementsByClassName("cityInput")
        if(element[0].value===""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

       
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperatute = document.getElementsByClassName("weather-temp");
        const location= document.getElementsByClassName("weather-location");

        humidity[0].innerHTML= data.main.humidity+" %";
        wind[0].innerHTML=data.wind.speed+" kmph";
        temperatute[0].innerHTML=data.main.temp+" °C";
        location[0].innerHTML= data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n" ){
            setWicon(clear_icon)
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloud_icon)
        }
        
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(cloud_icon)
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(drizzle_icon)
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(rain_icon)
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain_icon)
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow_icon)
        }
        else{
            setWicon(clear_icon)
        }
        } catch (e) {
            console.error("error occured");
            setError("It may be due to wrong spelling or network issue");
        }

    }

  return (
 
  <div className='container' >
        {error?(
            <div className="error-container">
            <div className="error-message">
              <h1>Error</h1>
              <img src={cry} alt="" />
              <p>{error}</p>
            </div>
          </div>
        ):(
            <>
        <div className="top-bar" >
            <input type="text" placeholder='search the city' className="cityInput" />
            <div className="search-icon" onClick={()=>{search()}} >
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        
        <div className="weather-temp">0 °C</div>
        <div className="weather-location"> City</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} className='icon' alt="" />
                <div className="data">
                    <div className="humidity-percent"> -- %</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} className='icon' alt="" />
                <div className="data">
                    <div className="wind-rate"> -- kmph</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
        </>
        )}
    </div>
  )
}

export default  Weatherapp 