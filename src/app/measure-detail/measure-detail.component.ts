import { Measure } from './../classes/measure';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-measure-detail',
  templateUrl: './measure-detail.component.html',
  styleUrls: ['./measure-detail.component.css']
})
export class MeasureDetailComponent implements OnInit {

  @Input() measure: Measure;
  @Output() closeDetail: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(/*measure: Measure */) { }

  ngOnInit() {
  }

  close() {
    this.closeDetail.emit(false);
  }

}
