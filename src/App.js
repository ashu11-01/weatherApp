import './App.css';
import React from 'react'
import Input from './input'
import axios from 'axios'
import defaultWeather from './weatherData'
import Pallette from './pallette'
import clear from './p_clear.jpg';
import fog from './p_fog.jpg'
import haze from './p_haze.jpg'
import rain from './p_rain.jpg'
import stormy from './p_stormy.jpg'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      inputCity : "",
      weather : defaultWeather,
      bgStyle : { 
        backgroundImage: undefined,
        height:'100vh',
        width: '100vw',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this)
  }

  handleFormSubmit(event){
    event.preventDefault()
    const {REACT_APP_WEATHER_API_KEY} = process.env
    axios.get('https://api.openweathermap.org/data/2.5/weather',{
      params:{
        q : this.state.inputCity,
        appid : REACT_APP_WEATHER_API_KEY
      }
    }).then(resp =>{
      // console.log(resp.data)
      this.setState((prevstate)=>({
        weather : resp.data,
        inputCity: prevstate.inputCity,
        bgStyle : prevstate.bgStyle})) 
    }).catch(error => {
      // alert(`Showing Default todos+${error}`)
      console.log(error);
   })
  }

  handleFormChange(event){
    const {value} = event.target
    this.setState((prevstate)=>({
        weather : prevstate.weather,
        inputCity: value,
        bgStyle : prevstate.bgStyle     
    }))
  }

  handleBackgroundChange(index){
    /*Background image array bgImgArray must be consturcted following below 
      0 Thunderstorm
      1 drizzle
      2 undefined
      3 rain
      4 snow
      5 atmosphere (mist, smoke, haze, dust, fog, sand)
      6 clear
      7 clouds
    so as to be able to use the weather condition codes
    More details here:
    https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 */
    const bgImgArray = [stormy,rain,undefined,rain,fog,haze,clear,clear]
    this.setState(prevstate => ({
      inputCity : prevstate.inputCity,
      weather : prevstate.weather,
      bgStyle : { 
          backgroundImage: `url(${bgImgArray[index]})`,
          height:'100vh',
          width: '100vw',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
      }
  }))
  }
  render(){
    // console.log(this.state)
    // console.log(process.env)
    return (
      <div className="App" style={this.state.bgStyle}>
        <Input 
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleFormSubmit}/>
        <br/>
        <Pallette 
          weatherInfo={this.state.weather}
          onWeatherChange={this.handleBackgroundChange}/>
      </div>
    );
  }
}


export default App;
