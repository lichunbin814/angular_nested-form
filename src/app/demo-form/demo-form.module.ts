import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFormComponent } from './demo-form.component';
import { ReactiveFormsModule } from '@angular/forms'
import { DemoFormService } from "src/app/demo-form/demo-form.service";
import { DemoChildFormModule } from "src/app/demo-form/demo-child-form/demo-child-form.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoChildFormModule
  ],
  providers : [
    DemoFormService
  ],
  declarations: [
    DemoFormComponent
  ],
  exports : [
    DemoFormComponent
  ]
})
export class DemoFormModule { }
