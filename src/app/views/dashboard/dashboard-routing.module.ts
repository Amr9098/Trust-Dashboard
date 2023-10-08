import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { AuthGaurd } from 'src/app/shared/services/auth.gaurd';


const routes: Routes = [

  {
    path: 'v1',
    component: DashboardV2Component,
     canActivate: [AuthGaurd] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
