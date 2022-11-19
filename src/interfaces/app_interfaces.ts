type MEASUREMENTVALUE = Number;

export interface Measurement {
  measure_type: string;
  measure_value: MEASUREMENTVALUE | string;
  measure: string;
}
