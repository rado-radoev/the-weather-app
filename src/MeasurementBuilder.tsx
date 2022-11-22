import { Measurement } from "./Measurement";
import { MEASURE_TYPE, MEASURE_ABBREVIATION } from "./enums/app_enums";

export class MeasurementBuilder {
  private readonly _measurement: Measurement;

  constructor() {
    this._measurement = {
      measure_type: MEASURE_TYPE.INITIALIZE,
      measure_value: '',
      measure: MEASURE_ABBREVIATION.INITIALIZE
    };
  }

  measure_type(measure_type: MEASURE_TYPE): MeasurementBuilder {
    this._measurement.measure_type = measure_type;
    return this;
  }

  measure_value(measure_value: string | number): MeasurementBuilder {
    this._measurement.measure_value = measure_value;
    return this;
  }

  measure(measure: MEASURE_ABBREVIATION): MeasurementBuilder {
    this._measurement.measure = measure;
    return this;
  }

  build(): Measurement {
    return this._measurement;
  }
}





// export class MeasurementBuilder1 {
//   public _measurement_type!: MEASURE_TYPE;
//   public _measurement_value!: string | number;
//   public _measurement_measure!: MEASURE_ABBREVIATION;

//   setMeasurementType(measurement_type: MEASURE_TYPE) {
//     this._measurement_type = measurement_type;
//     return this;
//   }

//   setMeasurementValue(measurement_value: string | number) {
//     this._measurement_value = measurement_value;
//     return this;
//   }

//   setMeasurementMeasure(measurement_measure: MEASURE_ABBREVIATION) {
//     this._measurement_measure = measurement_measure;
//     return this;
//   } 

//   build() {
//     return new Measurement(this._measurement_type, this._measurement_value, this._measurement_measure);
//   }

// }