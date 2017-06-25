import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'resulthtml',
    templateUrl: './resulthtml.component.html',
    inputs: ['resultType']
})


export class ResultComponent implements OnInit {
    resultHtml: any[] = [];

    resultHtmlHeader: any[] = [];

    resultType: string;

    resultCsv: string;

    resultSql: string;

    result: any[] = [];

    ngOnInit() {};

    /**
     * Transform result variable from array of objects to array of arrays.
     * This is easier to deal with in *ngFor loops.
     */
    formatResult(result: Object[]) {
        let resultHtml = [];
        let resultHtmlHeader = [];
        let i = 0;
        let resultCsv = '';
        let resultHeaderCsv = '';
        let resultSql = '';
        let resultHeaderSql = 'INSERT INTO table_name(';


        for (let record of result) {
            if (resultHtml[i] === undefined) {
                resultHtml[i] = [];
            }
            resultHtml[i + 1] = [];
            for (let j in record) {
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
    }
}
