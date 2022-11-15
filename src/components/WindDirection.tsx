import React from 'react';
import { calculateWindRose } from 'react-windrose-chart';
import { Chart } from 'react-windrose-chart';

function WindDirection() {
  interface windData {
    direction: number[];
    speed: number[];
  }

  const data: windData = {
    direction: [360],
    speed: [5.75]
  }

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

  const windRoseData = calculateWindRose(data);
  return (
    <div>WindDirection
      <Chart 
        chartData={windRoseData}
        responsive
        legendGap={10}
        columns={columns}
      />
    </div>
  )
}

export default WindDirection