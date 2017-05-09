import { Injectable }    from '@angular/core';
import { /*Headers, */Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
    rootUrl: string;

    constructor(private http: Http) {
        // this.rootUrl = 'http://randomdata.info:8081/api/';
        this.rootUrl = 'http://192.168.33.10/api/';
    }

    getFields() {

        console.log('querying URL ' + this.rootUrl);
        return this.http.get(this.rootUrl + 'fields')
            .toPromise();
    }
}