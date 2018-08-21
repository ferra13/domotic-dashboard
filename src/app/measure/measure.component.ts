import { Measure } from './../classes/measure';
import { MeasureService } from '../service/measure.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import * as ZoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent implements OnInit {

  measure: Measure;
  type: string;
  position: string;
  title: string;
  @Output('measureDetails') measureDetails = new EventEmitter();

  measures: Measure[];
  chartMeasures: any[];
  labels: Date[];
  yAxisLabel: string;
  myChart: Chart;

  constructor(private service: MeasureService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        this.type = data.type;
      });

    this.route.params.subscribe(params => {
      this.position = params['position'];
    });

    this.route.url.subscribe((val) => {
      this.service.getMeasures(this.type, this.position).subscribe(data => {
        this.measures = data;
        this.chartMeasures = data.map(measure => measure.value);
        // this.labels = data.map(measure => {
        //   const jsdate = new Date(measure.data);
        //   return jsdate.toLocaleDateString('it-IT', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
        // });
        this.labels = data.map(measure => measure.data);
        this.changeLabel(this.type, this.position);
        Chart.plugins.register(ZoomPlugin);
        const ctx = document.getElementById('myChart');
        this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [
              {
                data: this.chartMeasures,
                borderColor: '#3cba9f',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    minute: 'hh:mm',
                    hour: 'DD-MM hh:mm',
                    day: 'DD-MM',
                    month: 'MM-YY'
                  },
                  tooltipFormat: 'DD-MM HH:mm',
                  minUnit: 'hour',
                  stepSize: 5
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Date'
                }
              }
              ],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: this.yAxisLabel
                }
              }]
            },
            pan: {
              enabled: true,
              mode: 'x'
            },
            zoom: {
              enabled: true,
              mode: 'x'
            },
            animation: {
              duration: 2000,
              easing: 'linear'
            }
          }
        });
      });
    });

    this.changeLabel(this.type, this.position);
  }

  showMeasure(m: Measure) {
    this.measure = m;
    this.measureDetails.emit(this.measure);
  }

  changeLabel(type: string, position?: string) {
    switch (type) {
      case 'TEMPERATURE':
        this.yAxisLabel = '°C';
        this.title = 'Temperatura';
        if (position === 'INSIDE') {
          this.title = this.title + ' Interna';
        }
        if (position === 'OUTSIDE') {
          this.title = this.title + ' Esterna';
        }
        break;
      case 'PRESSURE':
        this.yAxisLabel =  'mmHg';
        this.title = 'Pressione';
        break;
      case 'HUMIDITY':
        this.yAxisLabel = '%';
        this.title = 'Umidità';
        break;
      case 'LIGHT':
        this.yAxisLabel = 'lux';
        this.title = 'Luce';
        break;
      default:
        break;
    }
  }
}
