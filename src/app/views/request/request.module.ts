import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderRequestesComponent } from './rider-requestes/rider-requestes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AvatarModule } from 'ngx-avatar';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxShimmeringLoaderModule } from 'ngx-shimmering-loader';



@NgModule({
  declarations: [
    RiderRequestesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
 
    AvatarModule,
    NgxShimmeringLoaderModule
  ]
})
export class RequestModule { }
