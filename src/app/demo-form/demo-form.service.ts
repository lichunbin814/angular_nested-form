import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { DemoFormModule } from "src/app/demo-form/demo-form.module";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class DemoFormService {

  private form$ =  new BehaviorSubject(this.init());

  teamForm$: Observable<FormGroup> = this.form$.asObservable()

  constructor(
    private fb: FormBuilder
  ) { }

  private init() : FormGroup {
    return this.fb.group({
      version  : new FormControl('v1.1'),
    });
  }

}
