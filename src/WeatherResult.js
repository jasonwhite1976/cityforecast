import React from 'react';

const WeatherResult = (props) => (
  <div>
    <p>Key: {props.listNumber}</p>
    <p>Forecast: {props.forecast0}</p> 
  </div>
)

export default WeatherResult