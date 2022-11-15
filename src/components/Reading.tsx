import logo from '../logo.svg';
import { Measurement } from '../interfaces/app_interfaces';

import { toUpper } from 'lodash'

function Reading(props: Measurement) {
  return (
    <div 
      key={props.measure_value?.toLocaleString() || 0} 
      className="flex flex-col items-center bg-black text-white"
    >
      <div>{toUpper(props.measure_type)}</div>
      <div>{props.measure_value?.toLocaleString() || 0}
        <span className='ml-2'>{props.measure}</span>
      </div>
      <img src={logo} width={30} height={30} alt='sun'/>
    </div>
  )
}

export default Reading;