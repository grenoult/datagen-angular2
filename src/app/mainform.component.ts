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
        let id = 1;

        if (this.formFields.length > 0) {
            let lastElement = this.formFields.slice(-1)[0];
            if (lastElement && lastElement.id) {
                id = lastElement.id + 1;
            }
        }

        newFormField.id = id;

        this.formFields.push(newFormField);
    }

    /**
     * Event listener to field deletion.
     * @param id
     */
    onFieldDeleted(id: number) {
        this.deleteField(id);
    }

    /**
     * Delete field with given ID.
     *
     * @param id
     */
    deleteField(id: number) {
        for (let i in this.formFields) {
            if (this.formFields[i].id === id) {
                // We use +i to convert i to number
                this.formFields.splice(+i, 1);
            }
        }
    }

    get diagnostic() { return JSON.stringify(this.formFields); }
}