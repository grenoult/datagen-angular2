import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'resulthtml',
    templateUrl: './resulthtml.component.html',
    inputs: ['resultType']
})


export class ResultComponent implements OnInit {
    result: any[] = [];

    resultType: string;

    resultCsv: string;

    resultSql: string;

    ngOnInit() {};

    /**
     * Transform result variable from array of objects to array of arrays.
     * This is easier to deal with in *ngFor loops.
     */
    formatResult(result: Object[]) {
        let newResult = [];
        let i = 0;
        let resultCsv = '';
        let resultHeaderCsv = '';
        let resultSql = '';
        let resultHeaderSql = 'INSERT INTO table_name(';

        for (let record of result) {
            if (newResult[i] === undefined) {
                newResult[i] = [];
            }
            newResult[i + 1] = [];
            for (let j in record) {
                if (record[j]) {
                    // Header
                    if (i === 0) {
                        newResult[i].push(j);
                        resultHeaderCsv = resultHeaderCsv + j + ';';
                        resultHeaderSql = resultHeaderSql + j + ', ';
                    }
                    // Column
                    newResult[i + 1].push(record[j]);
                    resultCsv = resultCsv + record[j] + ';';
                    resultSql = resultSql + '"' + record[j] + '", ';
                }
            }
            resultCsv = resultCsv.slice(0, -1) + '\n';
            resultSql = resultSql.slice(0, -2) + '),\n(';
            i++;
        }

        this.result = newResult;
        this.resultCsv = resultHeaderCsv.slice(0, -1) + '\n' + resultCsv;
        this.resultSql = resultHeaderSql.slice(0, -2) + ') VALUES \n(' + resultSql.slice(0, -3) + ';';
    }
}
