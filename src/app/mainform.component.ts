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
        let queryFields = {'queryFields': this.formFields, 'records': this.nbRecords};

        this.loading = true;

        this.dataService.submitForm(queryFields)
            .then((response) => {
                this.result = response.json();
                this.resultHtml.formatResult(this.result);
                // this.formatResult();
                this.loading = false;
            }).catch((ex) => {
                console.log(ex);
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
            // fields: this.fb.array([new FormField()]),
        });
    }

    get fields(): FormArray {
        return this.mainForm.get('fields') as FormArray;
    };
}