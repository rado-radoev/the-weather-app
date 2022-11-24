import logo from '../logo.svg';
import { IMeasurement, WeatherCondition } from '../interfaces/app_interfaces';

import { toUpper } from 'lodash'
import ImageItem from './ImageItem';

interface WeatherReadingProps extends IMeasurement {
  weather_conditions: WeatherCondition
}

function Reading(props: WeatherReadingProps) {
  const {icon: weatherIcon, description: weatherDescription, ...rest} = props.weather_conditions
  return (
    <div 
      key={props.measure_value?.toLocaleString() || 0} 
      className="flex flex-col items-center bg-black text-white"
    >
      <div>{toUpper(props.measure_type)}</div>
      <div>{props.measure_value?.toLocaleString() || 0}
        <span className='ml-2'>{props.measure}</span>
      </div>
      {/* TODO: FIX THIS. This should display different icon depending on the reading type */}
      <ImageItem 
        icon={weatherIcon}
        description={weatherDescription} 
        id={props.weather_conditions.id} 
        main={props.weather_conditions.main}        
        />
    </div>
  )
}

export default Reading;