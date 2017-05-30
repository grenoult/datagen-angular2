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
var FieldRowComponent = (function () {
    function FieldRowComponent() {
        this.onDeleted = new core_1.EventEmitter();
    }
    FieldRowComponent.prototype.ngOnInit = function () {
    };
    /**
     * Called when user changes field type.
     * If there is options, we select the default (disabled)
     * option by default.
     * If there is no options, we delete a reference to subtype, if any.
     */
    FieldRowComponent.prototype.selectFieldType = function () {
        if (this.types[this.fieldmodel.typeId].options) {
            this.fieldmodel.subtype = ''; // TODO should we delete, here?
        }
        else {
            delete this.fieldmodel.subtype;
        }
        if (this.types[this.fieldmodel.typeId].textinput) {
            this.fieldmodel.subtype = ''; // TODO should we delete, here?
        }
        else {
            delete this.fieldmodel.subtype;
        }
        for (var _i = 0, _a = this.types; _i < _a.length; _i++) {
            var type = _a[_i];
            if (type && type.id == this.fieldmodel.typeId) {
                this.fieldmodel.type = type.name;
                break;
            }
        }
    };
    /**
     * When user removes this field.
     */
    FieldRowComponent.prototype.delete = function () {
        this.onDeleted.emit(this.fieldmodel.id);
    };
    return FieldRowComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FieldRowComponent.prototype, "onDeleted", void 0);
FieldRowComponent = __decorate([
    core_1.Component({
        selector: 'field',
        templateUrl: './field.component.html',
        inputs: ['types', 'fieldmodel', 'nbFormFields'],
    })
], FieldRowComponent);
exports.FieldRowComponent = FieldRowComponent;
//# sourceMappingURL=field.component.js.map