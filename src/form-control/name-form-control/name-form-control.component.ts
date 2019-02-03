import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NameFormControl } from "src/form-control/name-form-control/name-form-control";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";


export const NameFormControlComponentAccessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NameFormControlComponent),
  multi: true
};

@Component({
  selector: 'app-name-form-control',
  templateUrl: './name-form-control.component.html',
  styleUrls: ['./name-form-control.component.css'],
  providers: [
    NameFormControlComponentAccessor
  ]
})
export class NameFormControlComponent implements OnInit, ControlValueAccessor {

  private _registerOnTouchedFn: Function;
  private _registerOnChangeFn: Function;

  model = {
    value: ''
  } as NameFormControl.ViewModel;

  constructor() { }

  ngOnInit() {
  }

  writeValue(model: NameFormControl.ViewModel): void {
    if (!model) {
      return;
    }

    this.model = model;
  }
  registerOnChange(fn: any): void {
    this._registerOnChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this._registerOnTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
