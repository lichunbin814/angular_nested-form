import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";

@Injectable()
export class DemoChildFormService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  create() {
    return this.formBuilder.group({
      name: new FormControl(`${+new Date()}_name`),
      address: new FormControl(`${+new Date()}_address`)
    })
  }

}
