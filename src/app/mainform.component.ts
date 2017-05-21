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
                // this.apiFields = dataFields.json();
                let apiFields = dataFields.json();
                let tmpObj = [];

                for (let i in apiFields) {
                    /**
                     * Convert options objects to array
                     * Api gives us options in Objets format
                     * whereas it's easier to deal with an array
                     * in Angular2.
                     */
                    if (apiFields.hasOwnProperty(i)) {
                        if (apiFields[i].options) {
                            let optionsArray = [];
                            for (let key in apiFields[i].options.options) {
                                if (apiFields[i].options.options.hasOwnProperty(key)) {
                                    let optionValue = apiFields[i].options.options[key];
                                    optionsArray.push({
                                        id: key,
                                        name: optionValue
                                    });
                                }
                            }

                            apiFields[i].options.options = optionsArray;
                        }

                        // Assign id to array index
                        if (apiFields.hasOwnProperty(i)) {
                            tmpObj[apiFields[i].id] = apiFields[i];
                        }
                    }
                }

                this.apiFields = tmpObj;

                console.log(this.apiFields);

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