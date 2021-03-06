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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        // this.rootUrl = 'http://randomdata.info:8081/api/';
        this.rootUrl = 'http://192.168.33.10/api/';
    }
    /**
     * Get fields available for generating data.
     *
     * @returns {Promise<T>}
     */
    DataService.prototype.getFields = function () {
        return this.http.get(this.rootUrl + 'fields')
            .toPromise();
    };
    /**
     * Send query to server to get fields.
     * Parameter queryField should be similar to:
     *  {"queryFields":[{"id":0,"type":"integer","subtype":"negative","fieldId":"0","name":"123"}],"records":10}
     *
     * @param queryFields
     * @returns {Promise<T>}
     */
    DataService.prototype.submitForm = function (queryFields) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var query = {
            query: JSON.stringify(queryFields)
        };
        return this.http.post(this.rootUrl + 'generate', query, options).toPromise();
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map