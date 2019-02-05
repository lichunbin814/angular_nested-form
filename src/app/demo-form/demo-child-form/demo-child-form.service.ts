import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormControl, Validators } from "@angular/forms";
import { NameFormControl } from "src/form-control/name-form-control/name-form-control";
import { UniqueOnMutitpleFieldsValidatorService } from 'src/form-control/validators/UniqueOnMutipleFields/unique-on-mutitple-fields-validator.service';

@Injectable()
export class DemoChildFormService {

  constructor(
    private formBuilder: FormBuilder,
    private uniqueOnMutitpleFieldsValidator: UniqueOnMutitpleFieldsValidatorService
  ) { }

  create() {
    return this.formBuilder.group({
      name: new FormControl({
        value: 'default_name'
      } as NameFormControl.ViewModel, [
          Validators.required,
          this.uniqueOnMutitpleFieldsValidator.init({
            groupName : 'childForm_name',
            errorMsg : 'name have to be unique'
          })
        ]),
      address: new FormControl(``, [
        Validators.required
      ])
    })
  }

}
