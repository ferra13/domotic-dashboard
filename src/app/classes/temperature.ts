import { Measure } from './measure';
import { TemperatureInterface } from './../interface/temperature';
export class Temperature extends Measure implements TemperatureInterface {
    position: string;

    constructor(id: string, data: Date, type: string, value: number, position: string) {
        super(id, data, type, value);
        this.position = position;
    }
}
