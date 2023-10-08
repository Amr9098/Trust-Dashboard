import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountViewComponent } from './account-view/account-view.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// // Drop Zone

@NgModule({
  declarations: [
    AccountViewComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
    ]
})
export class AccountModule { }
