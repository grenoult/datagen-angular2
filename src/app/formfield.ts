import {Field} from "./field";

export class FormField {
    id: number;
    label: string;
    name: string;
    textinput: boolean;
    textinputplaceholder: string;
    type: string;
    apiFields: Field[]; // TODO: Should this be private?

    // constructor(apiFields: Field[]) {
        // this.apiFields = apiFields;
    // }
}