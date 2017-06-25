import {Component, Output, EventEmitter} from '@angular/core';
import {Field} from './field';
import {Validators, FormGroup} from '@angular/forms';


@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    inputs: ['types', 'fieldForm'],
})

export class FieldRowComponent {
    /**
     * Types of fields from API.
     * @type {Array}
     */
    types: Field[];

    /**
     * Form Group
     * @type {FormGroup}
     */
    fieldForm: FormGroup;

    /**
     * Called when user changes field type.
     * If there is options, we select the default (disabled)
     * option by default.
     * If there is no options, we delete a reference to subtype, if any.
     */
    selectFieldType() {
        let typeId = this.fieldForm.get('typeId').value;
        let typeName;

        // Check if subtype is mandatory
        for (let type of this.types) {
            if (type && type.id == typeId) {
                typeName = type.name;
                if (type.options || type.textinput) {
                    this.fieldForm.controls.subtype.validator = Validators.required;
                } else {
                    this.fieldForm.controls.subtype.validator = undefined;
                }
            }
        }

        // Reset subtype value
        this.fieldForm.patchValue({
            subtype: '',
            type: typeName
        });
    }
}
