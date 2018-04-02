import React, {Component} from 'react';
import {render} from 'react-dom';
import {Helmet} from "react-helmet";
import HttpsRedirect from 'react-https-redirect';

import Header from './Header';
import WeatherAreaSearch from './WeatherAreaSearch';
import WeatherAreaResult from './WeatherAreaResult';
import WeatherResult from './WeatherResult';

import './style.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityName: 'London',
      weatherData: {},
      responseCountryName: '',
      responseCityName: '',
      responseForecastLists: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
	this.eachForecastList = this.eachForecastList.bind(this)
	//this.nextId = this.nextId.bind(this)
  }

  getWeather = () => {
    const city = this.state.cityName;
    const apiUrl = '//api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=f50d51daf1da2b2f0200eab25c635bd9';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ weatherData: data });
        this.setState({ responseCityName: data.city.name });
        this.setState({ responseCountryName: data.city.country });
        this.setState({ responseForecastLists: data.list });
        this.setState({ forecast8: data.list[8].weather[0].description });
        this.setState({ forecast16: data.list[16].weather[0].description });
		
      })
      .catch(error => console.log("Error:", error));

	  /*
	  let forecastTime = timeConverter(response.dt);
      forecastTime = forecastTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
      let description = response.weather[0].description;
      description = description.capitalize();
      let pressure = response.main.pressure;
      let humidity = response.main.humidity;
        
      let celsius = Math.round(response.main.temp * 10)/10;        
      let fahrenheit = Math.round((response.main.temp * 9 / 5 + 32)*10)/10;
        
      celsius = + celsius + "&deg;C";
      fahrenheit = + fahrenheit + "&deg;F";
	  */
	  
  }

  handleChange = (event) => {
    this.setState({ cityName: event.target.value });
    //console.log(this.state.cityName);
  }

  handleClick = () => {
    this.getWeather();
  }
  
  nextId = () => {	
    this.uniqueId = this.uniqueId || 0;
	console.log(this.uniqueId);	
    return this.uniqueId++;
  }
  
  
  eachForecastList(forecastList) {
	console.log(forecastList.weather[0].description)
    	
	let description = forecastList.weather[0].description
	
	let listId = this.nextId();
    
	return (
      <WeatherResult 
	    key={listId}
		forecast0={description}
		listNumber={listId}
		>
      </WeatherResult>
    )
	
  }

  render() {
    return (      
        <div>
        <HttpsRedirect>
		  <Helmet>
            <meta charSet="utf-8" />
            <title>City Forecast</title>
			<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
			<link href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css" rel="stylesheet" />
          </Helmet>          
		  <div className="container">
		    <div className="row">
		      <div className="columns twelve">
		        <Header />
                <WeatherAreaSearch 
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  placeholder={this.state.cityName}
                />		
				<WeatherAreaResult
				  areaName={this.state.responseCityName}
				  countryName={this.state.responseCountryName} 
				/>
				
                {/*<WeatherResult 
                  responseCode={this.state.weatherData.cod}
                  areaName={this.state.responseCityName}
                  countryName={this.state.responseCountryName}
                  //forecast0={this.getWeather.description}
                  forecast8={this.state.forecast8}
                  forecast16={this.state.forecast16}         
                />*/
				}
				
				{ this.state.responseForecastLists.map( this.eachForecastList ) }
				
		      </div>
		    </div>
		  </div>
        </HttpsRedirect>
		</div>
    )
  }

}

export default App