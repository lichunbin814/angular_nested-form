import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoChildFormComponent } from './demo-child-form.component';
import { DemoChildFormService } from "src/app/demo-form/demo-child-form/demo-child-form.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
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