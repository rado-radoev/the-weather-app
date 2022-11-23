import logo from '../logo.svg';
import { IMeasurement } from '../interfaces/app_interfaces';

import { toUpper } from 'lodash'
import ImageItem from './ImageItem';

function Reading(props: IMeasurement) {
  return (
    <div 
      key={props.measure_value?.toLocaleString() || 0} 
      className="flex flex-col items-center bg-black text-white"
    >
      <div>{toUpper(props.measure_type)}</div>
      <div>{props.measure_value?.toLocaleString() || 0}
        <span className='ml-2'>{props.measure}</span>
      </div>
      <ImageItem />
      {/* <img src={logo} width={30} height={30} alt='sun'/> */}
    </div>
  )
}

export default Reading;