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
    const apiUrl = '//api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=f50d51daf1da2b2f0200eab25c635bd9&units=metric';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ weatherData: data });
        this.setState({ responseCityName: data.city.name });
        this.setState({ responseCountryName: data.city.country });
        this.setState({ responseForecastLists: data.list });

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

  timeConverter = (UNIX_timestamp) => {
	  let theTime = new Date( UNIX_timestamp * 1000 );
 	  return theTime;
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

  let listId = this.nextId();

	console.log(forecastList.weather[0])
	let description = forecastList.weather[0].description

  let celsius = Math.round(forecastList.main.temp * 10) / 10;
  //console.log(celsius);

	let forecastDate = this.timeConverter(forecastList.dt);
	forecastDate = forecastDate.toLocaleTimeString(navigator.language, {weekday: 'long', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'});
	//console.log(forecastTime);

	return (
    <WeatherResult
	    key={listId}
		  forecastDate={forecastDate}
		  forecastDescription={description}
		  forecastTemperature={celsius}
		  listNumber={listId} />
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
                  placeholder={this.state.cityName} />
				        <WeatherAreaResult
				          areaName={this.state.responseCityName}
				          countryName={this.state.responseCountryName} />
				        { this.state.responseForecastLists.map(this.eachForecastList) }
                <hr />
				        <p>Github Source: <a href="https://github.com/jasonwhite1976/cityforecast" target="_blank">cityforecast</a></p>
		        </div>
		      </div>
		    </div>
      </HttpsRedirect>
		</div>
    )
  }

}

export default App
