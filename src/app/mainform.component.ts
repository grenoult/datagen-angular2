import {Component, OnInit} from '@angular/core';
import {DataService} from "./data.service";
import { Field } from "./field";
import {FormField} from "./formfield";

@Component({
    selector: 'main-form',
    templateUrl: './mainform.component.html',
    providers: [DataService]
})

export class MainformComponent implements OnInit {
    /**
     * Available fields fetch from API.
     * @type {Array}
     */
    apiFields: Field[] = [];

    /**
     * Fields of the form.
     * One will be created once we get apiFields
     * to show a default field.
     * @type {Array}
     */
    formFields: FormField[] = [];

    /**
     * Constructor.
     * @param dataService
     */
    constructor(private dataService: DataService) { }

    /**
     * On init
     */
    ngOnInit() {
        this.dataService.getFields()
            .then(function(dataFields: any) {
                // Pass api fields
                this.apiFields = dataFields.json();

                // Create new field in form
                this.addField();
            }.bind(this));
    }

    /**
     * When User adds a new field in the form
     */
    addField() {
        let newFormField = new FormField();

        this.formFields.push(newFormField);
    }

    get diagnostic() { return JSON.stringify(this.formFields); }
}