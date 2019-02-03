import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoChildFormComponent } from './demo-child-form.component';
import { DemoChildFormService } from "src/app/demo-form/demo-child-form/demo-child-form.service";
import { ReactiveFormsModule } from "@angular/forms";
import { NameFormControlModule } from "src/form-control/name-form-control/name-form-control.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NameFormControlModule
  ],
  providers :[
    DemoChildFormService
  ],
  declarations: [
    DemoChildFormComponent
  ],
  exports: [
    DemoChildFormComponent
  ]
})
export class DemoChildFormModule { }