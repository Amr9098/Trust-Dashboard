import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderRequestesComponent } from './rider-requestes/rider-requestes.component';


const routes: Routes = [

  {
    path: '',
    component: RiderRequestesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderRoutingModule { }
