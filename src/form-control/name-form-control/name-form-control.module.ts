import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameFormControlComponent } from './name-form-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NameFormControlComponent
  ],
  exports: [
    NameFormControlComponent
  ]
})
export class NameFormControlModule { }
