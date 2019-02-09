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

    const isHaveToInit = this.enteredValues[arg.groupName] === undefined;
    if (isHaveToInit) {
      this.enteredValues[arg.groupName] = {};
    }

    return (control: UniqueOnMutipleFieldsValidator.FormControl.Root) => {

      const model = control.value as UniqueOnMutipleFieldsValidator.FormControl.ValueType;
      const enteredValue = model.value;

      this.resetValidatorInfo({
        control,
        enteredValue,
        groupName: arg.groupName
      });


      let isInvalid = this.isEntered({
        groupName: arg.groupName,
        key: enteredValue,
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

  revalidateFormControl(
    arg: UniqueOnMutipleFieldsValidator.Method.RevalidateFormControlOfSameEnteredValue
  ) {
    for (const usedFormControl of arg.formControlArray) {
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

  getEnteredValueQuantitySet(arg: {
    groupName: string
  }) {
    return this.enteredValues[arg.groupName];
  }



  resetValidatorInfo(arg: UniqueOnMutipleFieldsValidator.Method.InitValidatorInfo) {


    return this.accessValidatorInfo({
      setAsNewInfo: (previousInfo) => {


        const previousEnteredValue = previousInfo.previousEnteredValue;
        const isSameAsPrevEnteredValue = previousEnteredValue === arg.enteredValue;
        if (isSameAsPrevEnteredValue) {
          return previousInfo;
        }

        this.recaculateEnteredValueQuantity({
          groupName: arg.groupName,
          enteredValue : {
            current : arg.enteredValue,
            prev : previousEnteredValue
          }
        });

        const changedFormcontrols = this.changeAssociationBetweenFormcontrolAndEnteredValue({
          enteredValue : {
            current : arg.enteredValue,
            prev : previousEnteredValue
          },
          groupName: arg.groupName,
          control: arg.control,
        });

        if (Array.isArray(changedFormcontrols)) {
          changedFormcontrols.forEach((changedFormcontrolArray) => {
            this.revalidateFormControl({
              control: arg.control,
              formControlArray: changedFormcontrolArray
            });
          });
        }

        return {
          previousEnteredValue: arg.enteredValue,
        } as UniqueOnMutipleFieldsValidator.FormControl.Info;
      },
      control: arg.control
    })
  }
  private changeAssociationBetweenFormcontrolAndEnteredValue(
    arg: UniqueOnMutipleFieldsValidator.Method.UpdateFormcontrolEnteredValue
  ) {

    const needsToBeRevalidatedFormControl = [] as UniqueOnMutipleFieldsValidator.FormControl.Root[][];

    this.setUsedFormControlArray({
      groupName: arg.groupName,
      key: arg.enteredValue.current,
      set: (usedFormControlArray) => {
        const currentUsedFormControlArray = this.recordUsedFormControl({
          control: arg.control,
          usedFormControlArray,
        });
        needsToBeRevalidatedFormControl.push(currentUsedFormControlArray);
      }
    });

    const haveToBeRemoveUnusedFormControl = this.haveBeenEntered(arg);
    if (haveToBeRemoveUnusedFormControl) {
      this.setUsedFormControlArray({
        groupName: arg.groupName,
        key: arg.enteredValue.prev,
        set: (usedFormControlArray) => {
          const unusedFormControlArray = this.removeUnusedFormControl({
            usedFormControlArray,
            target: arg.control
          });
          needsToBeRevalidatedFormControl.push(unusedFormControlArray);
        }
      });
    }

    return needsToBeRevalidatedFormControl;
  }

  private haveBeenEntered(arg:{
    enteredValue : {
      prev : UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType
    }
  }){
    return arg.enteredValue.prev !== undefined;
  }

  private recaculateEnteredValueQuantity(
    arg: UniqueOnMutipleFieldsValidator.Method.RecaculateEnteredValueQuantity
  ) {
    const enteredValueQuantitySet = this.getEnteredValueQuantitySet(arg);
    this.updateEnteredValueQuantity({
      enteredValueQuantitySet,
      key: arg.enteredValue.current,
      type: 'increase'
    });
    if (this.haveBeenEntered(arg)) {
      this.updateEnteredValueQuantity({
        enteredValueQuantitySet,
        key: arg.enteredValue.prev,
        type: 'decrease'
      });
    }
  }

  private recordUsedFormControl(arg: UniqueOnMutipleFieldsValidator.Method.RecordUsedFormControl) {
    if (!arg.usedFormControlArray) {
      return arg.usedFormControlArray;
    }

    arg.usedFormControlArray.push(arg.control);

    return arg.usedFormControlArray;
  }

  private setUsedFormControlArray(arg: {
    groupName: string,
    key: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType,
    set: (usedFormControlsArray: UniqueOnMutipleFieldsValidator.FormControl.Root[]) => void
  }) {
    if (!this.usedFormControlSet[arg.groupName]) {
      this.usedFormControlSet[arg.groupName] = {};
    }

    const usedFormControls = this.usedFormControlSet[arg.groupName];
    let usedFormControlsArray = usedFormControls[arg.key]
    if (!usedFormControlsArray) {
      usedFormControls[arg.key] = usedFormControlsArray = [];
    }

    arg.set(usedFormControlsArray);

    return usedFormControlsArray;
  }

  private updateEnteredValueQuantity(arg: UniqueOnMutipleFieldsValidator.Method.UpdateEnteredValueQuantity) {
    let newEndtedValue = (Number(arg.enteredValueQuantitySet[arg.key]) || 0);
    switch (arg.type) {
      case 'increase':
        newEndtedValue++
        break;
      case 'decrease':
        newEndtedValue--
        break;
      default:
        throw new Error('unknow type of update entered value quantity ');
    }

    arg.enteredValueQuantitySet[arg.key] = newEndtedValue;

  }


  isEntered(arg: {
    key: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType
    groupName: string
  }) {
    const enteredValueQuantitySet = this.getEnteredValueQuantitySet(arg);
    return (Number(enteredValueQuantitySet[arg.key]) || 0) >= 2;
  }

  private removeUnusedFormControl(arg: {
    usedFormControlArray: UniqueOnMutipleFieldsValidator.FormControl.Root[],
    target: UniqueOnMutipleFieldsValidator.FormControl.Root
  }) {
    if (!arg.usedFormControlArray) {
      return arg.usedFormControlArray;
    }

    const toBeDeletedIndex = arg.usedFormControlArray.indexOf(arg.target);
    if (~toBeDeletedIndex) {
      arg.usedFormControlArray.splice(toBeDeletedIndex, 1);
    }

    return arg.usedFormControlArray;
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
