import React from 'react';

const WeatherAreaResult = (props) => (

  <div>
    {props.areaName
    ?
    <div>
    <h2>{props.areaName} {props.countryName}</h2>
    </div>
    :
    <div></div>
    }
  </div>

)

export default WeatherAreaResult
