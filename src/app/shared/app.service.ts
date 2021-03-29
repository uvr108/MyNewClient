import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, takeUntil } from 'rxjs/operators';
import { Solicitud } from '../solicitud';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  private REST_API_SERVER = 'http://localhost:3000';
  destroy$: Subject<boolean> = new Subject<boolean>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  // counter = 0;
  dic: object;
  // count: BehaviorSubject<number>;
  dictio: BehaviorSubject<object>;
  mod$: Observable<Solicitud>;

  constructor(private crud: CrudService,) {
    // this.count  = new BehaviorSubject(this.counter);
    this.dictio = new BehaviorSubject(this.dic);
  }

  nextCount(pad: object) {

    console.log(JSON.stringify(pad));
    // this.count.next(this.counter = id);
    // this.dic['uno'] = this.counter;


    console.log(Object.keys(pad).length);


    this.dictio.next(pad);

  }


  private eventSubject = new BehaviorSubject<any>(undefined);

  triggerSomeEvent(param: any) {
      this.eventSubject.next(param);
  }

  getEventSubject(): BehaviorSubject<any> {
     return this.eventSubject;
  }


}
