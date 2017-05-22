import {Component, OnInit} from '@angular/core';
import {Field} from './field';
import {FormField} from './formfield';


@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    inputs : ['types', 'fieldmodel']
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

    ngOnInit() {

        // console.log(this.fieldmodel);
    }

    /**
     * Called when user changes field type.
     * If there is options, we select the default (disabled)
     * option by default.
     * If there is no options, we delete a reference to subtype, if any.
     */
    selectFieldType() {
        if (this.types[this.fieldmodel.typeId].options) {
            this.fieldmodel.subtypeId = 0;
        } else {
            delete this.fieldmodel.subtypeId;
        }

        if (this.types[this.fieldmodel.typeId].textinput) {
            this.fieldmodel.textinputvalue = '';
        } else {
            delete this.fieldmodel.textinputvalue;
        }
    }

    /**
     * Just for debug, to delete
     * @returns {string}
     */
    get diagnostic() {
        if (this.types[this.fieldmodel.typeId] && this.types[this.fieldmodel.typeId].options) {
            // return JSON.stringify(this.types[this.fieldmodel.typeId].options.options);
            // return JSON.stringify(this.types[this.fieldmodel.typeId]);
        } else {
            return JSON.stringify(this.types[this.fieldmodel.typeId]);
        }
    }
}
