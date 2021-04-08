import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Base url
  baseurl = 'http://localhost:3000';

 // Http Headers

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

  constructor(private http: HttpClient) { }

  GetByPk(table: string, pk: string = null): Observable<[{}]>  {

    return this.http.get<[{}]>(this.baseurl + '/api/' + table + '/pk/' + pk)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  GetData(table: string, fk: string = null): Observable<[{}]> {

    // console.log(`crud.service ${table} ${fk}`);

    if (fk) {
      // console.log('GeByFk crud : ', this.baseurl + '/api/' + table);
      return this.http.get<[{}]>(this.baseurl + '/api/' + table + '/fk/' + fk)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );

    }
    else {
      // console.log(`xxx -> ${this.baseurl}/api/${table}`);
      return this.http.get<[{}]>(this.baseurl + '/api/' + table)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
      // console.log('GeByFk crud : ', this.baseurl + '/api/' + table + '/fk/' + fk);
    }
}
// PUT
update(id: string, fk: object, compon: object, table: string): Observable<any> {
  // console.log(`crud Update() url -> ${this.baseurl} + '/api/' + ${table} + '/' + ${id}`);
  // console.log(`crud Update() tab -> ${JSON.stringify(tab)}`);
  return this.http.put<any>(this.baseurl + '/api/' + table + '/' + id, compon, this.httpOptions);
}

// DELETE
delete(id: string, table: string) {
  return this.http.delete<{}>(this.baseurl + '/api/'  + table + '/' + id, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );

}

public getData(table: string, fk: string = null): Observable<any> {

  let baseurl = '';
  if (fk === null) {
    baseurl = this.baseurl + '/api/' + table;
  } else {
    baseurl = this.baseurl + '/api/' + table + '/fk/' + fk;
  }

  return this.http.get<any>(baseurl);

}

agregar(tabla: {}, table: string, fk: string = null): Observable<{}> {

  let baseurl = this.baseurl + /api/ + table;

  if (fk) { baseurl += '/' + fk; }

  // console.log('agregar crud : ', baseurl, tabla);

  return this.http.post<any>(baseurl, tabla, this.httpOptions);
}

// Error handling
errorHandl(error) {
   let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
     // Get client-side error
     errorMessage = error.error.message;
   } else {
     // Get server-side error
     errorMessage = `Error Code: xxx ${error.status}\nMessage: ${error.message}`;
   }
   console.log(errorMessage);
   return throwError(errorMessage);
}

}
