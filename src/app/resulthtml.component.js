"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ResultHtmlComponent = (function () {
    function ResultHtmlComponent() {
        this.result = [];
    }
    ResultHtmlComponent.prototype.ngOnInit = function () { };
    ;
    /**
     * Transform result variable from array of objects to array of arrays.
     * This is easier to deal with in *ngFor loops.
     */
    ResultHtmlComponent.prototype.formatResult = function (result) {
        var newResult = [];
        var i = 0;
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var record = result_1[_i];
            if (newResult[i] === undefined) {
                newResult[i] = [];
            }
            newResult[i + 1] = [];
            for (var j in record) {
                if (record[j]) {
                    // Header
                    if (i === 0) {
                        newResult[i].push(j);
                    }
                    // Column
                    newResult[i + 1].push(record[j]);
                }
            }
            i++;
        }
        this.result = newResult;
        console.log(this.result);
    };
    return ResultHtmlComponent;
}());
ResultHtmlComponent = __decorate([
    core_1.Component({
        selector: 'resulthtml',
        templateUrl: './resulthtml.component.html',
    })
], ResultHtmlComponent);
exports.ResultHtmlComponent = ResultHtmlComponent;
//# sourceMappingURL=resulthtml.component.js.map