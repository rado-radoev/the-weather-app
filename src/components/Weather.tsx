import { useState, useEffect} from 'react';
import axios from 'axios';
import Reading from './Reading';
import { Measurement } from '../interfaces/app_interfaces';
import { MEASURE_TYPE, MEASURE_ABBREVIATION } from '../enums/app_enums';

const appId: string = import.meta.env.VITE_OPENWEATHERMAP_APP_ID;
const smartThingsToken: string = import.meta.env.VITE_SMART_THINGS_TOKEN;

// center of the world
let currentLat: number = 39;
let currentLon: number = 34;

const success = (pos: any) => {
  const crd = pos.coords;
  currentLat = crd.latitude,
  currentLon = crd.longitude
}

const error = (err: any) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error)

const baseUrl: string = `https://api.openweathermap.org/data/3.0/onecall?lat=${currentLat}&lon=${currentLon}&exclude=minutely&units=imperial&appid=${appId}`
const smartThingsButtonTempUrl: string = `https://api.smartthings.com/v1/devices/${import.meta.env.VITE_SMART_THINGS_BTN_ID}/status`

function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [indoorData, setIndoorData] = useState<any>(null);

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setWeather((): any => response.data)
    });

   axios.get(smartThingsButtonTempUrl, { headers: { Authorization: `Bearer ${smartThingsToken}`} })
    .then(response => {
      setIndoorData((): any => response.data)
    });
  },[])


  if (!weather) return null;

  const readings: Measurement[]  = [
    {
      measure_type: MEASURE_TYPE.GUST,
      measure_value: weather?.current.wind_speed,
      measure: MEASURE_ABBREVIATION.METERS_PER_SECOND
    },
    {
      measure_type: MEASURE_TYPE.AVERAGE,
      measure_value: weather?.current.wind_speed,
      measure: MEASURE_ABBREVIATION.METERS_PER_SECOND
    },    {
      measure_type: MEASURE_TYPE.BARO,
      measure_value: weather?.current.pressure,
      measure: MEASURE_ABBREVIATION.HECTO_PASCALS
    },    {
      measure_type: MEASURE_TYPE.RAIN,
      measure_value: weather?.current.clouds,
      measure: MEASURE_ABBREVIATION.MILLIMETER
    },    {
      measure_type: MEASURE_TYPE.OUTDOOR_TEMP,
      measure_value: weather?.current.temp,
      measure: MEASURE_ABBREVIATION.FAHRENHEIT
    },    {
      measure_type: MEASURE_TYPE.OUTDOOR_HUMIDITY,
      measure_value: weather?.current.humidity,
      measure: MEASURE_ABBREVIATION.PERCENT
    },    {
      measure_type: MEASURE_TYPE.INDOOR_TEMP,
      measure_value: indoorData?.components.main.temperatureMeasurement.temperature.value,
      measure: MEASURE_ABBREVIATION.FAHRENHEIT
    },    {
      measure_type: MEASURE_TYPE.INDOOR_HUMIDITY,
      measure_value: 55,
      measure: MEASURE_ABBREVIATION.PERCENT
    },
  ]
 
  return (
   <div 
      className="grid grid-flow-col grid-cols-3 gap-x-px grid-rows-3 bg-white"
    >
    {readings.map((reading, index) => 
      <Reading
        key={index}
        measure={reading.measure}
        measure_type={reading.measure_type}
        measure_value={reading.measure_value}
      />
      
    )}
  </div>
  )
}

export default Weather;