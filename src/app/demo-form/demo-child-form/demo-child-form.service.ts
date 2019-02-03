import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormControl,Validators } from "@angular/forms";

@Injectable()
export class DemoChildFormService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  create() {
    return this.formBuilder.group({
      name: new FormControl(``, [
        Validators.required
      ]),
      address: new FormControl(``, [
        Validators.required
      ])
    })
  }

}
