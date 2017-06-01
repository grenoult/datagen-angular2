import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Field} from './field';
import {FormField} from './formfield';


@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    inputs: ['types', 'fieldmodel', 'nbFormFields'],
})

export class FieldRowComponent implements OnInit {
    /**
     * Types of fields from API.
     * @type {Array}
     */
    types: Field[];

    /**
     * Model of current field component.
     * @type {FormField}
     */
    fieldmodel: FormField;

    /**
     *Number of Form Fields
     * @type {number}
     */
    nbFormFields: number;

    @Output() onDeleted = new EventEmitter<number>();

    ngOnInit() {
    }

    /**
     * Called when user changes field type.
     * If there is options, we select the default (disabled)
     * option by default.
     * If there is no options, we delete a reference to subtype, if any.
     */
    selectFieldType() {
        if (this.types[this.fieldmodel.typeId].options) {
            this.fieldmodel.subtype = ''; // TODO should we delete, here?
        } else {
            delete this.fieldmodel.subtype;
        }

        if (this.types[this.fieldmodel.typeId].textinput) {
            this.fieldmodel.subtype = ''; // TODO should we delete, here?
        } else {
            delete this.fieldmodel.subtype;
        }

        for (let type of this.types) {
            if (type && type.id == this.fieldmodel.typeId) {
                this.fieldmodel.type = type.name;
                break;
            }
        }
    }

    /**
     * When user removes this field.
     */
    delete() {
        this.onDeleted.emit(this.fieldmodel.id);
    }
}
