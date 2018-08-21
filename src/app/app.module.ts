import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RemoteMeasureService } from './service/remote-measure.service';
import { MeasureService } from './service/measure.service';
import { DashboardComponent } from './dahsboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MeasureComponent } from './measure/measure.component';
import { MeasureDetailComponent } from './measure-detail/measure-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'temperature/:position',
    pathMatch: 'full',
    component: MeasureComponent,
    data: { type: 'TEMPERATURE'}
  },
  {
    path: 'pressure',
    pathMatch: 'full',
    component: MeasureComponent,
    data: {type: 'PRESSURE'}
  },
  {
    path: 'humidity',
    pathMatch: 'full',
    component: MeasureComponent,
    data: {type: 'HUMIDITY'}
  },
  {
    path: 'light',
    pathMatch: 'full',
    component: MeasureComponent,
    data: {type: 'LIGHT'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MeasureComponent,
    MeasureDetailComponent,
    NavComponent,
    ModalBasicComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [
    MeasureService,
    RemoteMeasureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
