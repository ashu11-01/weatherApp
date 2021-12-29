import React, {useEffect} from 'react'
function kelvinToCelcius(kelvin){
    return (kelvin - 273.15).toFixed(2)
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

function Pallette(props){
    const {id,main} = props.weatherInfo.weather[0]
    const {feels_like,temp_min,temp_max} = props.weatherInfo.main
    const onWeatherChange = props.onWeatherChange
    useEffect(()=>{
        onWeatherChange(parseInt(id /100) -2)
    },[onWeatherChange,id])
    return(
        
        <div>
            <div className="pallette" >
                <p>Place:{props.weatherInfo.name}</p>
                <p>Weather:{main}</p>
                <p>Feels Like: {kelvinToCelcius(feels_like)}&deg; C</p>
                <p>Min Temp: {kelvinToCelcius(temp_min)}&deg; C</p>
                <p>Max Temp: {kelvinToCelcius(temp_max)}&deg; C</p>
                <p>Timestamp: {timeConverter(props.weatherInfo.dt)}</p>
            </div>
        </div>
    )
}

export default Pallette