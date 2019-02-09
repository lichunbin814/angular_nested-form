import { FormControl as NgFormControl } from "@angular/forms";

export namespace UniqueOnMutipleFieldsValidator {

    export namespace FormControl {

        export interface Root extends NgFormControl {
            uniqueOnMutipleFieldsValidatorInfo?: Info;
        }

        export interface ValueType {
            value: string;
        }

        export interface Info {
            previousEnteredValue?: EnteredValueSet.ValueType;
        }
    }

    export namespace Method {



        export interface UpdateEnteredValueQuantity {
            enteredValueQuantitySet: UniqueOnMutipleFieldsValidator.EnteredValueSet.Record;
            key: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
            type: 'increase' | 'decrease'
        }

        export interface RecordUsedFormControl {
            control: FormControl.Root;
            usedFormControlArray: FormControl.Root[];
        }

        export interface RevalidateFormControlOfSameEnteredValue {
            control: UniqueOnMutipleFieldsValidator.FormControl.Root;
            formControlArray: FormControl.Root[];
        }

        export interface InitValidatorInfo {
            enteredValue: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
            groupName: string;
            control: FormControl.Root;
        }

        export interface RecaculateEnteredValueQuantity {
            enteredValue: {
                current: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
                prev: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
            }
            groupName: string;
        }

        export interface UpdateFormcontrolEnteredValue {
            enteredValue: {
                current: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
                prev: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
            };
            groupName: string;
            control: UniqueOnMutipleFieldsValidator.FormControl.Root;
        }

    }

    export namespace UsedFormControlSet {
        export interface Record {
            [EnteredValue: string]: FormControl.Root[];
        }

        export interface Root {
            [GroupName: string]: Record;
        }
    }

    export namespace EnteredValueSet {

        type EnteredQuantity = number;

        export type ValueType = string;

        export interface Record {
            [EnteredValue: string]: EnteredQuantity;
        }

        export interface Root {
            [GroupName: string]: Record;
        }
    }

}