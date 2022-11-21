import { Measurement } from "./interfaces/app_interfaces";

interface MeasurementProps extends Measurement {}

export class Measurement implements MeasurementProps{
  measure_type: string;
  measure_value: number | string;
  measure: string
  constructor () {
    this.measure_type = ''
    this.measure_value = ''
    this.measure = ''
  }
}
