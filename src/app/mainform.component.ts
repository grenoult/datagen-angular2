import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from './data.service';
import {Field} from './field';
import {FormField} from './formfield';
import {ResultComponent} from './result.component';
import {FormArray, FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
    selector: 'main-form',
    templateUrl: './mainform.component.html',
    providers: [DataService],
    inputs: ['nbRecords']
})

export class MainformComponent implements OnInit {
    @ViewChild(ResultComponent) resultHtml: ResultComponent;

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
     * Indicates if we are loading formFields.
     * @type {boolean}
     */
    loading: boolean = false;

    /**
     * Number of records to get from API.
     * @type {string}
     */
    nbRecords: string = '10';

    /**
     * Result of query
     * @type {Array}
     */
    result: Object[] = [];

    /**
     * Result type of query
     * @type {Array}
     */
    resultType: string = 'html';

    mainForm: FormGroup;

    /**
     * Constructor.
     * @param dataService
     */
    constructor(private dataService: DataService, private fb: FormBuilder) {
        this.createForm();
    }

    /**
     * On init
     */
    ngOnInit() {
        this.loading = true;
        // this.form = new FormGroup();
        this.dataService.getFields()
            .then(function(dataFields: any) {
                // Pass api fields
                this.loading = false;

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

                // Create new field in form
                this.addField();
            }.bind(this));
    }

    /**
     * When User adds a new field in the form
     */
    addField() {
        let formGroup = this.fb.group({
            name: ['', Validators.required ],
            typeId: ['', Validators.required ],
            type: '',
            subtype: '',
        });

        this.fields.push(formGroup);
    }

    /**
     * Delete field with given ID.
     *
     * @param id
     */
    deleteField(id: number) {
        this.fields.removeAt(id);
    }

    submitForm() {
        let queryObject = {'queryFields': this.mainForm.value.fields, 'records': this.nbRecords};

        this.loading = true;

        this.dataService.submitForm(queryObject)
            .then((response) => {
                this.result = response.json();
                this.resultHtml.formatResult(this.result);
                this.resultHtml.errorMessage = '';
                this.loading = false;
            }).catch((ex) => {
                this.resultHtml.result = [];
                this.resultHtml.errorMessage = ex.statusText;
                this.loading = false;
            })
        ;
    }

    /**
     * Called when number of records changes from User.
     *
     * @param newValue
     */
    onNbRecordChange(newValue: string) {
        this.nbRecords = newValue;
    }

    /**
     * Called when result type changes from User.
     *
     * @param newValue
     */
    onResultTypeChange(newValue: string) {
        this.resultType = newValue;
    }

    createForm() {
        this.mainForm = this.fb.group({
            fields: this.fb.array([]),
            nbRecords: '10',
            resultType: 'html',
        });
    }

    resetForm() {
        for (let i = this.fields.length; i > 1; i--) {
            this.fields.removeAt(i - 1);
        }
        this.fields.reset();
        this.resultHtml.clear();
    }

    loadPredefinedData() {
        // Remove all existing fields
        while (this.fields.length > 0) {
            this.deleteField(0);
        }

        let i = 0;
        do {
            this.addField();
            i = i + 1;
        } while (i < 11);


        let defaultData = {
            fields: [
                { 'name': 'id', 'typeId': '1', 'type': 'integer', 'subtype': 'increment' },
                { 'name': 'firstname', 'typeId': '5', 'type': 'firstname', 'subtype': 'both' },
                { 'name': 'lastname', 'typeId': '6', 'type': 'surname', 'subtype': '' },
                { 'name': 'stnum', 'typeId': '11', 'type': 'street Number', 'subtype': '' },
                { 'name': 'stname', 'typeId': '10', 'type': 'street', 'subtype': '' },
                { 'name': 'state', 'typeId': '9', 'type': 'state', 'subtype': '' },
                { 'name': 'zip', 'typeId': '8', 'type': 'postcode', 'subtype': '' },
                { 'name': 'city', 'typeId': '7', 'type': 'city', 'subtype': '' },
                { 'name': 'phone', 'typeId': '4', 'type': 'phone', 'subtype': 'us' },
                { 'name': 'startdate', 'typeId': '3', 'type': 'date', 'subtype': 'past' },
                { 'name': 'creditcard', 'typeId': '2', 'type': 'regex', 'subtype': '^4[0-9]12(?:[0-9]3)?$' }
            ],
            nbRecords: '10',
            resultType: 'html'
        };

        this.mainForm.setValue(defaultData);
    }

    get fields(): FormArray {
        return this.mainForm.get('fields') as FormArray;
    };
}