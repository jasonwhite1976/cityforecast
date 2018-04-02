import React from 'react';

const WeatherAreaResult = (props) => (
  <div>
    <h2>Weather forecast</h2>
    <p>Area found: {props.areaName} {props.countryName}</p>
  </div>
)

export default WeatherAreaResult