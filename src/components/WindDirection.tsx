import { calculateWindRose } from 'react-windrose-chart';
import { Chart } from 'react-windrose-chart';


interface windData {
  direction: number[];
  speed: number[];
}

function WindDirection(props: windData) {

  const data = {
    direction:  props.direction,
    speed: props.speed
  }

  const windRoseData = calculateWindRose(data);
  
  const columns: string[] = [
    "angle",
    "0-1",
    "1-2",
    "2-3",
    "3-4",
    "4-5",
    "5-6",
    "6-7",
    "7-9",
  ]

 
  return (
    <div className="col-span-1 row-span-3 bg-gray-300">
      <Chart 
        chartData={windRoseData}
        columns={columns}
        legendGap={10}
        responsive
      />
    </div>
  )
}

export default WindDirection