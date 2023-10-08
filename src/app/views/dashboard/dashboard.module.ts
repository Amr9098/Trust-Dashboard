import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxShimmeringLoaderModule} from 'ngx-shimmering-loader';      


@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxShimmeringLoaderModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardV2Component]
})
export class DashboardModule { }
