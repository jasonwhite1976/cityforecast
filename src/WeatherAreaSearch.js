import React from 'react';

const WeatherAreaSearch = (props) => (
  <div>    
      <label className="form-label">Search for a City / Town</label>
      <div>
		<input
          type="text"
	      onChange={props.handleChange}
		  placeholder={props.placeholder} 
          className="u-full-width" />
      </div>
      <input 
        type="button" 
        onClick={props.handleClick} 
        value="Get the Weather"
        className="button" />
  </div>
)

export default WeatherAreaSearch