import { useState, useEffect} from 'react';
import axios from 'axios';
import Reading from './Reading';
import Loading from './Loading';
import { MEASURE_TYPE, MEASURE_ABBREVIATION } from '../enums/app_enums';
import WindDirection from './WindDirection';
import { MeasurementBuilder } from '../MeasurementBuilder';
import { Measurement } from '../Measurement';

function Weather() {
  const [coordinates, setCoordinates] = useState<number[]>([32, -117]) // <-- center of the world
  const [weather, setWeather] = useState<any>(null);
  const [indoorData, setIndoorData] = useState<any>(null);
  const [wind, setWind] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const [currentLat, currentLon] = coordinates
  const appId: string = import.meta.env.VITE_OPENWEATHERMAP_APP_ID;
  const smartThingsToken: string = import.meta.env.VITE_SMART_THINGS_TOKEN;
  const openWeatherUrl: string = `https://api.openweathermap.org/data/3.0/onecall?lat=${currentLat}&lon=${currentLon}&exclude=minutely&units=imperial&appid=${appId}`
  const smartThingsButtonTempUrl: string = `https://api.smartthings.com/v1/devices/${import.meta.env.VITE_SMART_THINGS_BTN_ID}/status`


  const fetchWeather = async ( weatherURL: string) => {
    try {
      const res = await axios.get(weatherURL);
      const { data } = res;
      getWindData(data);
      setWeather(() => data);
      if (data) {
        setIsLoading(() => false)
      }
    } catch (error) {
      console.log(`OpenWeather API data fetch failed: ${error}`);
    }
  }

  const fetchSmartThings = async( smartThingsURL: string ) => {
    try {
      const smartThingsAuthHeader = { headers: { Authorization: `Bearer ${smartThingsToken}`} }
      const res = await axios.get(smartThingsURL, smartThingsAuthHeader);
      const { data } = res;
      setIndoorData(() => data);
      // console.log('SmartThings data fetch')
    } catch (error) {
      console.log(`Samsung SmartThings data fetch failed ${error}`);
    }
  }

  const getWindData = (w: any) => {
    const direction: number[] = [];
    const speed: number[] = [];

    console.log(w)
    w.hourly.forEach((entry: any) => {
      direction.push(entry.wind_deg);
      speed.push(entry.wind_speed);
    })

    setWind(() => ({direction, speed}))
  }
  
  
  // useEffect(() => {
  //   // Only get the position on app load. This will be used by a static device. No need to run all the time.
  //   const success = (pos: GeolocationPosition) => {
  //     const crd = pos.coords;
  //     setCoordinates(() => [crd.latitude, crd.longitude])
  //   }

  //   const error = (err: GeolocationPositionError) => {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //   }

  //   const options = {
  //     maximumAge: 60000
  //   }

  //   navigator.geolocation.getCurrentPosition(success, error, options)
  // }, [])

  useEffect(() => {
    fetchWeather(openWeatherUrl);
    fetchSmartThings(smartThingsButtonTempUrl);
    console.log('Invoked useEffect')
  },[coordinates])

  const weatherReading: Measurement[] = [
    new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.ALERTS)
      .measure_value('weather?.alerts[0].event')
      .measure(MEASURE_ABBREVIATION.ALERTS)
      .build()
    ,
    new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.GUST)
      .measure_value(weather?.current.wind_speed)
      .measure(MEASURE_ABBREVIATION.METERS_PER_SECOND)
      .build()
    ,
      new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.AVERAGE)
      .measure_value(weather?.current.wind_speed)
      .measure(MEASURE_ABBREVIATION.METERS_PER_SECOND)
      .build()
    ,
    new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.BARO)
      .measure_value(weather?.current.pressure)
      .measure(MEASURE_ABBREVIATION.HECTO_PASCALS)
      .build()
    ,
    new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.RAIN)
      .measure_value(weather?.current.clouds)
      .measure(MEASURE_ABBREVIATION.MILLIMETER)
      .build()
    ,
    new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.OUTDOOR_TEMP)
      .measure_value(weather?.current.temp)
      .measure(MEASURE_ABBREVIATION.FAHRENHEIT)
      .build()
    ,
    new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.OUTDOOR_HUMIDITY)
      .measure_value(weather?.current.humidity)
      .measure(MEASURE_ABBREVIATION.PERCENT)
      .build()
    ,
    new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.INDOOR_TEMP)
      .measure_value(indoorData?.components.main.temperatureMeasurement.temperature.value)
      .measure(MEASURE_ABBREVIATION.FAHRENHEIT)
      .build()
    ,
    new MeasurementBuilder()
      .measure_type(MEASURE_TYPE.INDOOR_HUMIDITY)
      .measure_value(55)
      .measure(MEASURE_ABBREVIATION.PERCENT)
      .build()
  ]
  
   if (isLoading) return <Loading />

  return (
   <div
      className="grid grid-flow-col grid-cols-3 gap-x-px grid-rows-3 bg-white w-screen h-screen"
    >
    {weatherReading.map((reading, index) =>
      <Reading
        key={index}
        measure={reading.measure}
        measure_type={reading.measure_type}
        measure_value={reading.measure_value}
      />
    )}
      <WindDirection direction={wind.direction} speed={wind.speed} />
  </div>
  )
}

export default Weather;
