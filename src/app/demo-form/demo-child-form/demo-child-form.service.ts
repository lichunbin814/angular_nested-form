import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormControl, Validators } from "@angular/forms";
import { NameFormControl } from "src/form-control/name-form-control/name-form-control";

@Injectable()
export class DemoChildFormService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  create() {
    return this.formBuilder.group({
      name: new FormControl({
        value: 'default_name'
      } as NameFormControl.ViewModel, [
          Validators.required
        ]),
      address: new FormControl(``, [
        Validators.required
      ])
    })
  }

}
