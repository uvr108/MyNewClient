import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    msg:string=null;

    count: BehaviorSubject<string>;

    constructor() {

        this.count = new BehaviorSubject(this.msg);
    }

    nextCount() {
        this.count.next(this.msg);

    }

}
