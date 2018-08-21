import { Measure } from './classes/measure';
import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  measureSelected: Measure;
  showDetail = false;

  measureDetail(measure: Measure) {
    this.measureSelected = measure;
    this.showDetail = true;
  }

  onCloseForm(showDetail: boolean) {
    this.showDetail = showDetail;
  }
}
