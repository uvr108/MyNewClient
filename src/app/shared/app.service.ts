import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    // trigger reload data

    msg:string='ninguna';
    send: BehaviorSubject<string>;

    constructor() {

        this.send = new BehaviorSubject(this.msg);

    }

    nextMsg(table:string) {

        this.send.next(this.msg = table);
    }


}
