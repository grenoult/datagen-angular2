"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_service_1 = require("./data.service");
var result_component_1 = require("./result.component");
var forms_1 = require("@angular/forms");
var MainformComponent = (function () {
    /**
     * Constructor.
     * @param dataService
     */
    function MainformComponent(dataService, fb) {
        this.dataService = dataService;
        this.fb = fb;
        /**
         * Available fields fetch from API.
         * @type {Array}
         */
        this.apiFields = [];
        /**
         * Fields of the form.
         * One will be created once we get apiFields
         * to show a default field.
         * @type {Array}
         */
        this.formFields = [];
        /**
         * Indicates if we are loading formFields.
         * @type {boolean}
         */
        this.loading = false;
        /**
         * Number of records to get from API.
         * @type {string}
         */
        this.nbRecords = '10';
        /**
         * Result of query
         * @type {Array}
         */
        this.result = [];
        /**
         * Result type of query
         * @type {Array}
         */
        this.resultType = 'html';
        this.createForm();
    }
    /**
     * On init
     */
    MainformComponent.prototype.ngOnInit = function () {
        this.loading = true;
        // this.form = new FormGroup();
        this.dataService.getFields()
            .then(function (dataFields) {
            // Pass api fields
            this.loading = false;
            var apiFields = dataFields.json();
            var tmpObj = [];
            for (var i in apiFields) {
                /**
                 * Convert options objects to array
                 * Api gives us options in Objets format
                 * whereas it's easier to deal with an array
                 * in Angular2.
                 */
                if (apiFields.hasOwnProperty(i)) {
                    if (apiFields[i].options) {
                        var optionsArray = [];
                        for (var key in apiFields[i].options.options) {
                            if (apiFields[i].options.options.hasOwnProperty(key)) {
                                var optionValue = apiFields[i].options.options[key];
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
    };
    /**
     * When User adds a new field in the form
     */
    MainformComponent.prototype.addField = function () {
        var formGroup = this.fb.group({
            name: ['', forms_1.Validators.required],
            typeId: ['', forms_1.Validators.required],
            subtype: '',
        });
        this.fields.push(formGroup);
    };
    /**
     * Delete field with given ID.
     *
     * @param id
     */
    MainformComponent.prototype.deleteField = function (id) {
        this.fields.removeAt(id);
    };
    MainformComponent.prototype.submitForm = function () {
        var _this = this;
        var queryFields = { 'queryFields': this.formFields, 'records': this.nbRecords };
        this.loading = true;
        this.dataService.submitForm(queryFields)
            .then(function (response) {
            _this.result = response.json();
            _this.resultHtml.formatResult(_this.result);
            // this.formatResult();
            _this.loading = false;
        }).catch(function (ex) {
            console.log(ex);
            _this.loading = false;
        });
    };
    /**
     * Called when number of records changes from User.
     *
     * @param newValue
     */
    MainformComponent.prototype.onNbRecordChange = function (newValue) {
        this.nbRecords = newValue;
    };
    /**
     * Called when result type changes from User.
     *
     * @param newValue
     */
    MainformComponent.prototype.onResultTypeChange = function (newValue) {
        this.resultType = newValue;
    };
    MainformComponent.prototype.createForm = function () {
        this.mainForm = this.fb.group({
            fields: this.fb.array([]),
        });
    };
    Object.defineProperty(MainformComponent.prototype, "fields", {
        get: function () {
            return this.mainForm.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    ;
    return MainformComponent;
}());
__decorate([
    core_1.ViewChild(result_component_1.ResultComponent),
    __metadata("design:type", result_component_1.ResultComponent)
], MainformComponent.prototype, "resultHtml", void 0);
MainformComponent = __decorate([
    core_1.Component({
        selector: 'main-form',
        templateUrl: './mainform.component.html',
        providers: [data_service_1.DataService],
        inputs: ['nbRecords']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, forms_1.FormBuilder])
], MainformComponent);
exports.MainformComponent = MainformComponent;
//# sourceMappingURL=mainform.component.js.map