import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Base url

  private REST_API_SERVER = 'http://localhost:3000';
 // Http Headers

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

  constructor(private http: HttpClient) { }

  GetByPk(table: string, pk: string = null): Observable<[{}]>  {

    return this.http.get<[{}]>(this.REST_API_SERVER + '/api/' + table + '/pk/' + pk)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  GetData(table: string, fk: string = null): Observable<[{}]> {

    // console.log(`crud.service ${table} ${fk}`);

    if (fk) {
      // console.log('GeByFk crud : ', this.baseurl + '/api/' + table);
      return this.http.get<[{}]>(this.REST_API_SERVER + '/api/' + table + '/fk/' + fk)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );

    }
    else {
      // console.log(`xxx -> ${this.baseurl}/api/${table}`);
      return this.http.get<any>(this.REST_API_SERVER + '/api/' + table)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
      // console.log('GeByFk crud : ', this.baseurl + '/api/' + table + '/fk/' + fk);
    }
}

public ingresar(sol: object, fk: string): Observable<any> {
    var url = this.REST_API_SERVER  + '/api/Solicitud/' + fk;
    console.log(url);
    return this.http.post<any>(url, sol, this.httpOptions);
}

// PUT

public modificar(sol: object): Observable<any> {

  var url = this.REST_API_SERVER  + '/api/Solicitud/' + sol['id'];
  // console.log('URL -> ', url);
  // console.log('SOL -> ', sol);
  return  this.http.put<any>(url, sol, this.httpOptions);

}


/*
update(id: string, tab: {}, table: string): Observable<{}> {
  // console.log(`crud Update() url -> ${this.baseurl} + '/api/' + ${table} + '/' + ${id}`);
  // console.log(`crud Update() tab -> ${JSON.stringify(tab)}`);
  return this.http.put<{}>(this.REST_API_SERVER + '/api/' + table + '/' + id, tab, this.httpOptions);
}
*/

// DELETE
delete(id: string, table: string) {
  return this.http.delete<{}>(this.REST_API_SERVER + '/api/'  + table + '/' + id, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );

}

public getData(table: string, fk: string = null): Observable<any> {

  let baseurl = '';
  if (fk === null) {
    baseurl = this.REST_API_SERVER + '/api/' + table;
  } else {
    baseurl = this.REST_API_SERVER + '/api/' + table + '/fk/' + fk;
  }

  return this.http.get<any>(baseurl)
  .pipe(retry(3), catchError(this.handleError));
}

agregar(tabla: {}, table: string, fk: string = null): Observable<{}> {

  let baseurl = this.REST_API_SERVER + /api/ + table;

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

}
