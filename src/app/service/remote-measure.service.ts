import { Measure } from './../classes/measure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class RemoteMeasureService {
    private arduinoUrl = 'http://2.238.144.131:8080/domotic-hub/remote/measure/getCurrent';
    // private arduinoUrl = 'http://localhost:8080/domotic-hub/remote/measure/getCurrent';

    constructor(private http: HttpClient) {
    }

    getMeasures() {
        return this.http.get<Measure[]>(this.arduinoUrl);
    }
}
