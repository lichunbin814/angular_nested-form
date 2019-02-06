import { Injectable } from '@angular/core';
import { UniqueOnMutipleFieldsValidator } from "./unique-on-mutitple-fields-validator";


@Injectable()
export class UniqueOnMutitpleFieldsValidatorService {

  private enteredValues = {} as UniqueOnMutipleFieldsValidator.EnteredValueSet.Root;

  private usedFormControlSet = {} as UniqueOnMutipleFieldsValidator.UsedFormControlSet.Root;

  constructor() { }

  init(arg: {
    groupName: string,
    errorMsg: string
  }) {
    return (control: UniqueOnMutipleFieldsValidator.FormControl.Root) => {


      const isHaveToInit = this.enteredValues[arg.groupName] === undefined;
      if (isHaveToInit) {
        this.enteredValues[arg.groupName] = {};
      }

      const enteredValueQuantitySet = this.enteredValues[arg.groupName];

      const isChangeToNewValueResult = this.isChangeToNewValue({
        control: control
      });
      const enteredValue = isChangeToNewValueResult.enteredValue;

      if (isChangeToNewValueResult.isRight) {
        this.setPreviousEnteredValueAsUnentered({
          groupName: arg.groupName,
          control,
          enteredValueQuantitySet,
          prevEnteredValue: isChangeToNewValueResult.prevEnteredValue
        });
      }

      let isInvalid = this.isEntered({
        currentValue: enteredValue,
        enteredValueQuantitySet,
        isUncaculateEnteredValueQuantity : isChangeToNewValueResult.isRight
      });

      if (isChangeToNewValueResult.isRight) {
        this.updateEnteredValue({
          groupName: arg.groupName,
          control,
          enteredValueQuantitySet,
          enteredValue
        });

        this.revalidateFormControl({
          control,
          key: enteredValue,
          groupName: arg.groupName,
        })

        if (isChangeToNewValueResult.isRight) {
          this.revalidateFormControl({
            control,
            key: isChangeToNewValueResult.prevEnteredValue,
            groupName: arg.groupName,
          })
        }
      }


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

  revalidateFormControl(
    arg: UniqueOnMutipleFieldsValidator.Method.RevalidateFormControlOfSameEnteredValue
  ) {
    if (!this.usedFormControlSet[arg.groupName]) {
      return;
    }

    const usedFormControlArray = this.usedFormControlSet[arg.groupName][arg.key];
    if (!usedFormControlArray) {
      return;
    }

    for (const usedFormControl of usedFormControlArray) {
      const uninited = usedFormControl.valueChanges === undefined;
      if (uninited) {
        continue;
      }

      const isSelf = arg.control === usedFormControl;
      if (isSelf) {
        continue;
      }

      usedFormControl.updateValueAndValidity();
    };
  }

  updateValidatorInfo(arg: UniqueOnMutipleFieldsValidator.Method.UpdateValidatorInfo) {
    this.accessValidatorInfo({
      setAsNewInfo: (info) => {
        return {
          ...info,
          previousEnteredValue: arg.enteredValue
        };
      },
      control: arg.control
    })
  }

  private isChangeToNewValue(arg: {
    control: UniqueOnMutipleFieldsValidator.FormControl.Root,
  }) {
    const model = arg.control.value as UniqueOnMutipleFieldsValidator.FormControl.ValueType;

    const enteredValue = model.value;
    const info = this.accessValidatorInfo(arg);
    const prevEnteredValue: string = info.previousEnteredValue;

    return {
      enteredValue,
      prevEnteredValue: info.previousEnteredValue,
      isRight: enteredValue !== prevEnteredValue
    }
  }

  private updateEnteredValue(arg: UniqueOnMutipleFieldsValidator.Method.UpdateEnteredValue) {
    this.recordUsedFormControl(arg);

    this.increaseEnteredValueQuantity(arg);

    this.updateValidatorInfo(arg);
  }

  private recordUsedFormControl(arg: UniqueOnMutipleFieldsValidator.Method.RecordUsedFormControl) {
    if (!this.usedFormControlSet[arg.groupName]) {
      this.usedFormControlSet[arg.groupName] = {};
    }

    const usedFormControls = this.usedFormControlSet[arg.groupName];
    if (!usedFormControls[arg.enteredValue]) {
      usedFormControls[arg.enteredValue] = [];
    }

    usedFormControls[arg.enteredValue].push(arg.control);
  }

  private increaseEnteredValueQuantity(arg: UniqueOnMutipleFieldsValidator.Method.IncreaseEnteredValueQuantity) {
    arg.enteredValueQuantitySet[arg.enteredValue] = (Number(arg.enteredValueQuantitySet[arg.enteredValue]) || 0) + 1;
  }

  isEntered(arg: {
    currentValue: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType
    enteredValueQuantitySet: UniqueOnMutipleFieldsValidator.EnteredValueSet.Record,
    isUncaculateEnteredValueQuantity : boolean
  }) {
    const limit = arg.isUncaculateEnteredValueQuantity ? 1 : 2;
    return (Number(arg.enteredValueQuantitySet[arg.currentValue]) || 0) >= limit;
  }

  private setPreviousEnteredValueAsUnentered(
    arg: UniqueOnMutipleFieldsValidator.Method.SetPreviousEnteredValueAsUnentered
  ) {
    this.noNeedToCaculateQuantityOfPrevEnteredValue(arg);
    this.noNeedToRevalidateOfPrevEnteredFormControl(arg);
  }

  private noNeedToCaculateQuantityOfPrevEnteredValue(
    arg: UniqueOnMutipleFieldsValidator.Method.NoNeedToCaculateQuantityOfPrevEnteredValue
  ) {
    const info = this.accessValidatorInfo({
      control: arg.control
    });

    const enteredCount = arg.enteredValueQuantitySet[info.previousEnteredValue];
    const unentered = enteredCount === undefined;
    if (unentered) {
      return;
    } else {
      arg.enteredValueQuantitySet[info.previousEnteredValue]--;
    }
  }

  noNeedToRevalidateOfPrevEnteredFormControl(
    arg: UniqueOnMutipleFieldsValidator.Method.NoNeedToRevalidateOfPrevEnteredFormControl
  ) {
    if (!this.usedFormControlSet[arg.groupName]) {
      return;
    }

    const usedFormControlArray = this.usedFormControlSet[arg.groupName][arg.prevEnteredValue];
    if (!usedFormControlArray) {
      return;
    }

    this.removeUsedFormControl({
      usedFormControlArray,
      target: arg.control
    });
  }

  private removeUsedFormControl(arg: {
    usedFormControlArray: UniqueOnMutipleFieldsValidator.FormControl.Root[],
    target: UniqueOnMutipleFieldsValidator.FormControl.Root
  }) {
    const toBeDeletedIndex = arg.usedFormControlArray.indexOf(arg.target);
    if (~toBeDeletedIndex) {
      arg.usedFormControlArray.splice(toBeDeletedIndex, 1);
    }
  }

  accessValidatorInfo(arg: {
    control: UniqueOnMutipleFieldsValidator.FormControl.Root,
    setAsNewInfo?: (info: UniqueOnMutipleFieldsValidator.FormControl.Info) => UniqueOnMutipleFieldsValidator.FormControl.Info
  }) {
    if (!arg.control.uniqueOnMutipleFieldsValidatorInfo) {
      arg.control.uniqueOnMutipleFieldsValidatorInfo = {};
    }

    if (typeof arg.setAsNewInfo === 'function') {
      const currentInfo = arg.control.uniqueOnMutipleFieldsValidatorInfo;
      const newInfo = arg.setAsNewInfo(currentInfo);
      arg.control.uniqueOnMutipleFieldsValidatorInfo = newInfo;
    }

    return arg.control.uniqueOnMutipleFieldsValidatorInfo;
  }

}
