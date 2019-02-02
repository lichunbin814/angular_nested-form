import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFormComponent } from './demo-form.component';
import { ReactiveFormsModule } from '@angular/forms'
import { DemoFormService } from "src/app/demo-form/demo-form.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
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
