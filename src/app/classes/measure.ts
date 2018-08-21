import { MeasureInterface } from './../interface/measure';
export class Measure implements MeasureInterface {
    id: string;
    data: Date;
    type: string;
    value: number;

    constructor(id: string, data: Date, type: string, value: number) {
        this.id = id;
        this.data = data;
        this.type = type;
        this.value = value;
    }
}
