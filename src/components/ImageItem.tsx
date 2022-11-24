import { WeatherCondition } from "../interfaces/app_interfaces"


export default function ImageItem(props: WeatherCondition) {
  return (
    <div>
      <img src={`../../assets/icons${props.icon}`} alt={props.description} />
    </div>
  )
}