import React from 'react';

const WeatherResult = (props) => (
  <div>
    <hr />
	  <p>{props.forecastDate}</p>
    <p className="first-letter-capitals">{props.forecastDescription} <i className={props.forecastIcon}></i> </p>
    <p>Temp - {props.forecastTemperature}&deg;C</p>
  </div>
)

export default WeatherResult
