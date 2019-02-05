import { FormControl as NgFormControl } from "@angular/forms";

export namespace UniqueOnMutipleFieldsValidator {

    export namespace FormControl {

        export interface Root extends NgFormControl {
            uniqueOnMutipleFieldsValidatorInfo?: Info;
        }

        export interface Info {
            previousEnteredValue?: EnteredValueSet.ValueType;
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