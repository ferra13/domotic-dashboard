import { Measure } from './../classes/measure';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MeasureService {

    // private serverUrl = 'http://2.238.144.131:8080/domotic-hub';
    private serverUrl = 'http://localhost:8080/domotic-hub';
    private serverApi = {
        getMeasure: this.serverUrl + '/api/measure',
        getTemperature: this.serverUrl + '/api/measure/temperature',
        getHumidity: this.serverUrl + '/api/measure/humidity',
        getPressure: this.serverUrl + '/api/measure/pressure',
        getLight: this.serverUrl + '/api/measure/light'
    };
    constructor(private http: HttpClient) {
    }

    getMeasures(type: string, position?: string) {
        switch (type) {
            case 'TEMPERATURE':
            {
                console.log(position);
                return this.http.get<Measure[]>(this.serverApi.getTemperature, {params: new HttpParams().set('position', position)});
            }
            case 'PRESSURE':
                return this.http.get<Measure[]>(this.serverApi.getPressure);
            case 'HUMIDITY':
                return this.http.get<Measure[]>(this.serverApi.getHumidity);
            case 'LIGHT':
                return this.http.get<Measure[]>(this.serverApi.getLight);
            default:
                return null;
        }
        // return this.http.get<Measure[]>(this.serverApi.getMeasure);
    }

    getTemperatures() {
        return this.http.get<Measure[]>(this.serverApi.getTemperature);
    }

    getHumidity() {
        return this.http.get<Measure[]>(this.serverApi.getHumidity);
    }

    getPressure() {
        return this.http.get<Measure[]>(this.serverApi.getPressure);
    }

    getLight() {
        return this.http.get<Measure[]>(this.serverApi.getLight);
    }

    measureDetails(measure: Measure) {
        return alert(measure.value);
    }
}
