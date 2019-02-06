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

        export interface UpdateEnteredValue extends
            IncreaseEnteredValueQuantity,
            RecordUsedFormControl,
            UpdateValidatorInfo {

        }

        export interface IncreaseEnteredValueQuantity {
            enteredValueQuantitySet: UniqueOnMutipleFieldsValidator.EnteredValueSet.Record;
            enteredValue: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
        }

        export interface RecordUsedFormControl {
            control: FormControl.Root,
            enteredValue: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
            groupName: string;
        }

        export interface UpdateValidatorInfo {
            control: UniqueOnMutipleFieldsValidator.FormControl.Root;
            enteredValue: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
        }

        export interface SetPreviousEnteredValueAsUnentered extends
            NoNeedToRevalidateOfPrevEnteredFormControl,
            NoNeedToCaculateQuantityOfPrevEnteredValue {
        }

        export interface NoNeedToCaculateQuantityOfPrevEnteredValue {
            control: UniqueOnMutipleFieldsValidator.FormControl.Root
            enteredValueQuantitySet: UniqueOnMutipleFieldsValidator.EnteredValueSet.Record
        }

        export interface NoNeedToRevalidateOfPrevEnteredFormControl {
            control: UniqueOnMutipleFieldsValidator.FormControl.Root;
            groupName: string;
            prevEnteredValue: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
        }

        export interface RevalidateFormControlOfSameEnteredValue {
            control: UniqueOnMutipleFieldsValidator.FormControl.Root,
            groupName: string,
            key: UniqueOnMutipleFieldsValidator.EnteredValueSet.ValueType;
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