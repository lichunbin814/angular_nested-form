import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoChildFormComponent } from './demo-child-form.component';
import { DemoChildFormService } from "src/app/demo-form/demo-child-form/demo-child-form.service";
import { ReactiveFormsModule } from "@angular/forms";
import { NameFormControlModule } from "src/form-control/name-form-control/name-form-control.module";
import { UniqueOnMutitpleFieldsValidatorService } from 'src/form-control/validators/UniqueOnMutipleFields/unique-on-mutitple-fields-validator.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NameFormControlModule
  ],
  providers :[
    DemoChildFormService,
    UniqueOnMutitpleFieldsValidatorService
  ],
  declarations: [
    DemoChildFormComponent
  ],
  exports: [
    DemoChildFormComponent
  ]
})
export class DemoChildFormModule { }