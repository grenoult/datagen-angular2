import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'resulthtml',
    templateUrl: './resulthtml.component.html',
})


export class ResultHtmlComponent implements OnInit {
    result: any[] = [];

    ngOnInit() {};

    /**
     * Transform result variable from array of objects to array of arrays.
     * This is easier to deal with in *ngFor loops.
     */
    formatResult(result: Object[]) {
        let newResult = [];
        let i = 0;

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
                    }
                    // Column
                    newResult[i + 1].push(record[j]);
                }
            }
            i++;
        }

        this.result = newResult;
    }
}
