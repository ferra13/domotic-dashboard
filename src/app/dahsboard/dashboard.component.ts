import { Temperature } from './../classes/temperature';
import { RemoteMeasureService } from './../service/remote-measure.service';
import { Measure } from './../classes/measure';

import { MeasureService } from '../service/measure.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    title = 'Situazione Attuale';
    temperatureInside: Temperature;
    temperatureOutside: Temperature;
    currentPressure: Measure;
    currentLight: Measure;
    currentHumidity: Measure;

    constructor(private remoteService: RemoteMeasureService, private route: Router) {
    }

    getMeasureByType(measures: Measure[], type: string): Measure {
      return measures.filter(m => m.type === type)[0];
    }

    getTemperature(measures: any[], position: string): Temperature {
      return measures.filter(t => t.position === position)[0];
    }

    ngOnInit() {
          this.getCurrentMeasures();
    }

    getCurrentMeasures() {
      this.temperatureInside = null;
      this.temperatureOutside = null;
      this.currentLight = null;
      this.currentHumidity = null;
      this.currentPressure = null;
      this.remoteService.getMeasures().subscribe(data => {
        const currentMeasure = data;
        this.temperatureInside = this.getTemperature(data.filter(m => m.type === 'TEMPERATURE'), 'INSIDE');
        this.temperatureOutside = this.getTemperature(data.filter(m => m.type === 'TEMPERATURE'), 'OUTSIDE');
        this.currentLight = this.getMeasureByType(data, 'LIGHT');
        this.currentHumidity = this.getMeasureByType(data, 'HUMIDITY');
        this.currentPressure = this.getMeasureByType(data, 'PRESSURE');
      }, error => alert(JSON.stringify(error)));
    }

    temperatureDetail(position: string) {
      this.route.navigate(['temperature', position]);
    }
    pressureDetail() {
      this.route.navigate(['pressure']);
    }
    lightDetail() {
      this.route.navigate(['light']);
    }
    humidityDetail() {
      this.route.navigate(['humidity']);
    }
}
