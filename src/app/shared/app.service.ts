import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    // trigger reload data

    msg:string='enviado';
    send: BehaviorSubject<string>;

    // send register

    // dic: object= null;
    // dictio: BehaviorSubject<object>;

    constructor() {

        this.send = new BehaviorSubject(this.msg);
        // this.dictio = new BehaviorSubject(this.dic);
    }

    nextMsg() {

        this.send.next(this.msg);
    }


}
