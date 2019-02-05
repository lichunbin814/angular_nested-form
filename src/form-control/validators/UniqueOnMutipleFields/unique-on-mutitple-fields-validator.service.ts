import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { UniqueOnMutipleFieldsValidator } from "./unique-on-mutitple-fields-validator";


@Injectable()
export class UniqueOnMutitpleFieldsValidatorService {

  private enteredValues = {} as UniqueOnMutipleFieldsValidator.EnteredValueSet.Root;

  constructor() { }

  init(arg: {
    groupName: string,
    errorMsg: string
  }) {
    return (control: UniqueOnMutipleFieldsValidator.FormControl.Root) => {
      const model = control.value as {
        value: string
      };

      const currentValue = model.value;

      const isHaveToInit = this.enteredValues[arg.groupName] === undefined;
      if (isHaveToInit) {
        this.enteredValues[arg.groupName] = {};
      }

      const enteredValueQuantitySet = this.enteredValues[arg.groupName];

      this.setPreviousEnteredValueAsUnentered({
        control,
        enteredValueQuantitySet
      });

      let isInvalid = this.isEntered({
        currentValue,
        enteredValueQuantitySet
      });

      this.updateEnteredValue({
        enteredValueQuantitySet,
        key: currentValue
      })

      this.updatePreviousEnteredValue({
        control,
        updatedValue: currentValue
      });


      if (isInvalid) {
        return {
          uniqueOnMutitpleFields: arg.errorMsg
        };
      } else {
        const valid = null;
        return valid;
      }
    };
  }

  updatePreviousEnteredValue(arg: {
    control: UniqueOnMutipleFieldsValidator.FormControl.Root,
    updatedValue: string
  }) {
    this.accessLastEnteredValue({
      setAsNewInfo: (info) => {
        return {
          ...info,
          previousEnteredValue: arg.updatedValue
        };
      },
      control: arg.control
    })
  }

  updateEnteredValue(arg: {
    enteredValueQuantitySet: UniqueOnMutipleFieldsValidator.EnteredValueSet.Record,
    key: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType
  }) {
    arg.enteredValueQuantitySet[arg.key] = (Number(arg.enteredValueQuantitySet[arg.key]) || 0) + 1;
  }

  isEntered(arg: {
    currentValue: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType
    enteredValueQuantitySet: UniqueOnMutipleFieldsValidator.EnteredValueSet.Record,
  }) {
    return (Number(arg.enteredValueQuantitySet[arg.currentValue]) || 0) >= 1;
  }

  private setPreviousEnteredValueAsUnentered(arg: {
    control: UniqueOnMutipleFieldsValidator.FormControl.Root
    enteredValueQuantitySet: UniqueOnMutipleFieldsValidator.EnteredValueSet.Record
  }) {
    this.accessLastEnteredValue({
      get: (result) => {
        const enteredCount = arg.enteredValueQuantitySet[result.previousEnteredValue];
        const unentered = enteredCount === undefined;
        if (unentered) {
          return;
        } else {
          arg.enteredValueQuantitySet[result.previousEnteredValue]--;
        }
      },
      control: arg.control
    })
  }

  accessLastEnteredValue(arg: {
    control: UniqueOnMutipleFieldsValidator.FormControl.Root,
    get?: (result: {
      previousEnteredValue: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType
    }) => void,
    setAsNewInfo?: (info: UniqueOnMutipleFieldsValidator.FormControl.Info) => UniqueOnMutipleFieldsValidator.FormControl.Info
  }) {
    if (!arg.control.uniqueOnMutipleFieldsValidatorInfo) {
      arg.control.uniqueOnMutipleFieldsValidatorInfo = {};
    }

    const uniqueOnMutitpleFieldsValidatorInfo = arg.control.uniqueOnMutipleFieldsValidatorInfo;
    if (typeof arg.get === 'function') {
      arg.get({
        previousEnteredValue: uniqueOnMutitpleFieldsValidatorInfo.previousEnteredValue
      });
    }

    if (typeof arg.setAsNewInfo === 'function') {
      const newInfo = arg.setAsNewInfo(uniqueOnMutitpleFieldsValidatorInfo);
      arg.control.uniqueOnMutipleFieldsValidatorInfo = newInfo;
    }
  }

}
