import {Component, OnInit} from '@angular/core';
import {DataService} from "./data.service";
import { Field } from "./field";

@Component({
    selector: 'main-form',
    templateUrl: './mainform.component.html',
    providers: [DataService]
})

export class MainformComponent implements OnInit {
    fields: Field[] = [];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getFields()
            .then(dataFields => this.fields = dataFields.json());
    }
}