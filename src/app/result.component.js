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
        this.resultHtml = [];
        this.resultHtmlHeader = [];
        this.result = [];
    }
    ResultComponent.prototype.ngOnInit = function () { };
    ;
    /**
     * Transform result variable from array of objects to array of arrays.
     * This is easier to deal with in *ngFor loops.
     */
    ResultComponent.prototype.formatResult = function (result) {
        var resultHtml = [];
        var resultHtmlHeader = [];
        var i = 0;
        var resultCsv = '';
        var resultHeaderCsv = '';
        var resultSql = '';
        var resultHeaderSql = 'INSERT INTO table_name(';
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var record = result_1[_i];
            if (resultHtml[i] === undefined) {
                resultHtml[i] = [];
            }
            resultHtml[i + 1] = [];
            for (var j in record) {
                if (record[j]) {
                    // Header
                    if (i === 0) {
                        resultHtmlHeader.push(j);
                        resultHeaderCsv = resultHeaderCsv + j + ';';
                        resultHeaderSql = resultHeaderSql + j + ', ';
                    }
                    // Column
                    resultHtml[i + 1].push(record[j]);
                    resultCsv = resultCsv + record[j] + ';';
                    resultSql = resultSql + '"' + record[j] + '", ';
                }
            }
            resultCsv = resultCsv.slice(0, -1) + '\n';
            resultSql = resultSql.slice(0, -2) + '),\n(';
            i++;
        }
        this.resultHtml = resultHtml;
        this.resultHtmlHeader = resultHtmlHeader;
        this.resultCsv = resultHeaderCsv.slice(0, -1) + '\n' + resultCsv;
        this.resultSql = resultHeaderSql.slice(0, -2) + ') VALUES \n(' + resultSql.slice(0, -3) + ';';
        this.result = result;
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