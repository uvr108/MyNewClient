// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  /*
  private REST_API_SERVER = 'http://localhost:3000';

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
*/

  // counter = 0;
  dic: object;
  // count: BehaviorSubject<number>;
  dictio: BehaviorSubject<object>;

  constructor() {
    // this.count  = new BehaviorSubject(this.counter);
    this.dictio = new BehaviorSubject(this.dic);
  }

  nextCount(pad: object) {
    // this.count.next(this.counter = id);
    // this.dic['uno'] = this.counter;
    this.dictio.next(pad);
  }

  /*
  public getData(table: string, fk: string = null): Observable<any> {

    let baseurl = '';
    if (fk === null) {
      baseurl = this.REST_API_SERVER + '/api/' + table;
    } else {
      baseurl = this.REST_API_SERVER + '/api/' + table + '/fk/' + fk;
    }

    return this.httpClient.get<any>(baseurl)
    .pipe(retry(3), catchError(this.handleError));

  }
  */
  private eventSubject = new BehaviorSubject<any>(undefined);

  triggerSomeEvent(param: any) {
      this.eventSubject.next(param);
  }

  getEventSubject(): BehaviorSubject<any> {
     return this.eventSubject;
  }


}
