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

  GetData(table: string, fk: string = null): Observable<[{}]> {

    if (fk) {
      // console.log('GeByFk crud : ', this.baseurl + '/api/' + table);
      return this.http.get<[{}]>(this.baseurl + '/api/' + table + '/fk/' + fk)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );

    }
    else {
      return this.http.get<any>(this.baseurl + '/api/' + table)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
      // console.log('GeByFk crud : ', this.baseurl + '/api/' + table + '/fk/' + fk);
    }
}
// PUT
update(id: string, tab: {}, table: string): Observable<{}> {
  // console.log(`crud Update() url -> ${this.baseurl} + '/api/' + ${table} + '/' + ${id}`);
  // console.log(`crud Update() tab -> ${JSON.stringify(tab)}`);
  return this.http.put<{}>(this.baseurl + '/api/' + table + '/' + id, tab, this.httpOptions);
}

// DELETE
delete(id: string, table: string) {
  return this.http.delete<{}>(this.baseurl + '/api/'  + table + '/' + id, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );

}

agregar(tabla: {}, table: string, fk: string = null): Observable<{}> {

  let baseurl = this.baseurl + /api/ + table;

  if (fk) { baseurl += '/' + fk; }

  // console.log('agregar crud : ', baseurl, tabla);

  return this.http.post<any>(baseurl, tabla, this.httpOptions);
}

load(ref: string = null): void {

  // console.log(`load() Master : table ${this.table} fk : ${this.fk}`);
  /*
  this.GetData(table, null)
  .subscribe(data => {
    // console.log(data);
    this.padre = [];
    data.forEach((f) => {
      const subresult = [];
      // console.log(f);
      for (const [key, value] of Object.entries(f)) {
        if (this.flag) {this.cabecera.push(key); }
        subresult.push(value);
    }
      this.padre.push(subresult);
      this.flag = false;
});
    this.total = this.padre.length;
    // console.log(`load() Master padre : ${JSON.stringify(this.padre)}`);
  });
  */
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
