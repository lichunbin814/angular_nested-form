import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { DemoFormModule } from "src/app/demo-form/demo-form.module";

@Injectable()
export class DemoFormService {

  constructor(
    private fb: FormBuilder
  ) { }

  init() : FormGroup {
    return this.fb.group({
      version  : new FormControl('v1.0'),
    });
  }

}
