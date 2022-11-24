import { WeatherCondition } from "../interfaces/app_interfaces"


export default function ImageItem({icon, description, ...props}: WeatherCondition) {
  return (
    <div>
      <img src={`../../assets/icons/${icon}.svg`} alt={description} />
    </div>
  )
}