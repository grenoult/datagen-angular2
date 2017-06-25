"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FieldRowComponent = (function () {
    function FieldRowComponent() {
    }
    /**
     * Called when user changes field type.
     * If there is options, we select the default (disabled)
     * option by default.
     * If there is no options, we delete a reference to subtype, if any.
     */
    FieldRowComponent.prototype.selectFieldType = function () {
        var typeId = this.fieldForm.get('typeId').value;
        var typeName;
        // Check if subtype is mandatory
        for (var _i = 0, _a = this.types; _i < _a.length; _i++) {
            var type = _a[_i];
            if (type && type.id == typeId) {
                typeName = type.name;
                if (type.options || type.textinput) {
                    this.fieldForm.controls.subtype.validator = forms_1.Validators.required;
                }
                else {
                    this.fieldForm.controls.subtype.validator = undefined;
                }
            }
        }
        // Reset subtype value
        this.fieldForm.patchValue({
            subtype: '',
            type: typeName
        });
    };
    return FieldRowComponent;
}());
FieldRowComponent = __decorate([
    core_1.Component({
        selector: 'field',
        templateUrl: './field.component.html',
        inputs: ['types', 'fieldForm'],
    })
], FieldRowComponent);
exports.FieldRowComponent = FieldRowComponent;
//# sourceMappingURL=field.component.js.map