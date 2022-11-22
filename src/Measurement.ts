import { IMeasurement } from "./interfaces/app_interfaces";
import { MEASURE_TYPE, MEASURE_ABBREVIATION } from "./enums/app_enums";

export class Measurement implements IMeasurement{
  constructor (
    public measure_type: MEASURE_TYPE,
    public measure_value: number | string,
    public measure: MEASURE_ABBREVIATION,
  ) {}
}
