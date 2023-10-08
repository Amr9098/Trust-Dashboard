import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ViewAllRidersScheduleComponent } from "./view-all-riders-schedule/view-all-riders-schedule.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxPaginationModule } from "ngx-pagination";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AvatarModule } from "ngx-avatar";
import { NgxShimmeringLoaderModule } from "ngx-shimmering-loader";
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

@NgModule({
  declarations: [ViewAllRidersScheduleComponent],
  imports: [
    CommonModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgxShimmeringLoaderModule,
    Ng2FlatpickrModule,
    
  ],
})
export class ScheduleModule {}
