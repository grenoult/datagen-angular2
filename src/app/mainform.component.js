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
var formfield_1 = require("./formfield");
var MainformComponent = (function () {
    /**
     * Constructor.
     * @param dataService
     */
    function MainformComponent(dataService) {
        this.dataService = dataService;
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
    }
    /**
     * On init
     */
    MainformComponent.prototype.ngOnInit = function () {
        this.dataService.getFields()
            .then(function (dataFields) {
            // Pass api fields
            // this.apiFields = dataFields.json();
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
            console.log(this.apiFields);
            // Create new field in form
            this.addField();
        }.bind(this));
    };
    /**
     * When User adds a new field in the form
     */
    MainformComponent.prototype.addField = function () {
        var newFormField = new formfield_1.FormField();
        var id = 1;
        if (this.formFields.length > 0) {
            var lastElement = this.formFields.slice(-1)[0];
            if (lastElement && lastElement.id) {
                id = lastElement.id + 1;
            }
        }
        newFormField.id = id;
        this.formFields.push(newFormField);
    };
    /**
     * Delete field with given ID.
     *
     * @param id
     */
    MainformComponent.prototype.deleteField = function (id) {
        for (var i in this.formFields) {
            if (this.formFields[i].id === id) {
                delete this.formFields[i];
            }
        }
    };
    Object.defineProperty(MainformComponent.prototype, "diagnostic", {
        get: function () { return JSON.stringify(this.formFields); },
        enumerable: true,
        configurable: true
    });
    return MainformComponent;
}());
MainformComponent = __decorate([
    core_1.Component({
        selector: 'main-form',
        templateUrl: './mainform.component.html',
        providers: [data_service_1.DataService]
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], MainformComponent);
exports.MainformComponent = MainformComponent;
//# sourceMappingURL=mainform.component.js.map