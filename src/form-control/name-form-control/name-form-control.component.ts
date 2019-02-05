import { Component, OnInit, forwardRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NameFormControl } from "src/form-control/name-form-control/name-form-control";
import { fromEvent } from "rxjs";

import { debounceTime } from 'rxjs/operators';


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
export class NameFormControlComponent implements OnInit, AfterViewInit, ControlValueAccessor {


  private _registerOnTouchedFn: Function;
  private _registerOnChangeFn: Function;

  model = {
    value: ''
  } as NameFormControl.ViewModel;

  @ViewChild('input')
  inputElmRef: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    fromEvent(this.inputElmRef.nativeElement, 'input')
      .pipe(
      debounceTime(200)
      )
      .subscribe((event: Event) => {
        this.writeValue({
          ...this.model,
          value: (event.target as HTMLInputElement).value,
        });

        this._registerOnTouchedFn();
      });
  }



  writeValue(model: NameFormControl.ViewModel): void {
    if (!model) {
      return;
    }

    this.model = model;

    if (this._registerOnChangeFn) {
      this._registerOnChangeFn(this.model);
    }
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
