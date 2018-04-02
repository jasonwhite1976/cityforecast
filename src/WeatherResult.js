import React from 'react';

const WeatherResult = (props) => (
  <div>
    <hr />
	  <p>{props.forecastDate}</p>
    <p>{props.forecastDescription}</p>
    <p>{props.forecastTemperature}&deg;C</p>
  </div>
)

export default WeatherResult
