import {Component, OnInit} from '@angular/core';
import {Field} from './field';
import {FormField} from './formfield';


@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    inputs : ['types', 'fieldmodel']
})

export class FieldComponent implements OnInit {
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

    ngOnInit() {  }
}
