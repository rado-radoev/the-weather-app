type MEASUREMENTVALUE = Number;
import { MEASURE_TYPE, MEASURE_ABBREVIATION } from "../enums/app_enums";

export interface IMeasurement {
  measure_type: MEASURE_TYPE;
  measure_value: string | MEASUREMENTVALUE ;
  measure: MEASURE_ABBREVIATION;
}
