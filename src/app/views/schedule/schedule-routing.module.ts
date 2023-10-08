import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ViewAllRidersScheduleComponent } from "./view-all-riders-schedule/view-all-riders-schedule.component";

const routes: Routes = [
  {
    path: "",
    component: ViewAllRidersScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
