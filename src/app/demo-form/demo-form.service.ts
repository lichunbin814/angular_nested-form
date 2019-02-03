import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { DemoFormModule } from "src/app/demo-form/demo-form.module";
import { BehaviorSubject, Observable } from "rxjs";
import { DemoChildFormService } from "src/app/demo-form/demo-child-form/demo-child-form.service";

@Injectable()
export class DemoFormService {

  private form$ = new BehaviorSubject(this.init());

  teamForm$: Observable<FormGroup> = this.form$.asObservable()

  get currentChildrenForms() {
    const currentForm = this.form$.getValue();
    return (currentForm.controls.children as FormArray).controls;
  }

  constructor(
    private fb: FormBuilder,
    private demoChildFormService: DemoChildFormService
  ) { }

  private init(): FormGroup {
    return this.fb.group({
      version: new FormControl('v1.1'),
      children: new FormArray([])
    });
  }


  addChild() {
    this.currentChildrenForms.push(this.demoChildFormService.create());
  }

}
