import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    msg:string='enviado';

    send: BehaviorSubject<string>;

    constructor() {

        this.send = new BehaviorSubject(this.msg);
    }

    nextCount() {
        this.send.next(this.msg);

    }

}
