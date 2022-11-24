import logo from '../logo.svg';
import { IMeasurement, WeatherCondition } from '../interfaces/app_interfaces';

import { toUpper } from 'lodash'
import ImageItem from './ImageItem';

interface WeatherReadingProps extends IMeasurement {
  weather_conditions: WeatherCondition
}

function Reading(props: WeatherReadingProps) {
  return (
    <div 
      key={props.measure_value?.toLocaleString() || 0} 
      className="flex flex-col items-center bg-black text-white"
    >
      <div>{toUpper(props.measure_type)}</div>
      <div>{props.measure_value?.toLocaleString() || 0}
        <span className='ml-2'>{props.measure}</span>
      </div>
      //TODO: FIX THIS 👇
      <ImageItem weather_conditions={props.weather_conditions}/>
      {/* <img src={logo} width={30} height={30} alt='sun'/> */}
    </div>
  )
}

export default Reading;