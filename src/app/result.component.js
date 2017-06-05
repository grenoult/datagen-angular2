"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ResultComponent = (function () {
    function ResultComponent() {
        this.result = [];
    }
    ResultComponent.prototype.ngOnInit = function () { };
    ;
    /**
     * Transform result variable from array of objects to array of arrays.
     * This is easier to deal with in *ngFor loops.
     */
    ResultComponent.prototype.formatResult = function (result) {
        var newResult = [];
        var i = 0;
        var resultCsv = '';
        var resultHeaderCsv = '';
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
                        resultHeaderCsv = resultHeaderCsv + j + ';';
                    }
                    // Column
                    newResult[i + 1].push(record[j]);
                    resultCsv = resultCsv + record[j] + ';';
                }
            }
            resultCsv = resultCsv.slice(0, -1) + '\n';
            i++;
        }
        this.result = newResult;
        this.resultCsv = resultHeaderCsv.slice(0, -1) + '\n' + resultCsv;
    };
    return ResultComponent;
}());
ResultComponent = __decorate([
    core_1.Component({
        selector: 'resulthtml',
        templateUrl: './resulthtml.component.html',
        inputs: ['resultType']
    })
], ResultComponent);
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map