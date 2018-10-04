import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from './jwt.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}
  httpOptionsWithoutAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptionsWithAuth = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.jwtService.getToken()
    })
  };

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, options): Observable<any> {
    return this.http
      .get(
        `${environment.api_url}${path}`,
        options
      )
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, options): Observable<any> {
    return this.http
      .put(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        options
      )
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options): Observable<any> {
    return this.http
      .post(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        options
      )
      .pipe(catchError(this.formatErrors));
  }

  postData(path: string, body: FormData, options): Observable<any> {
    return this.http
      .post(
        `${environment.api_url}${path}`,
        body,
        options
      )
      .pipe(catchError(this.formatErrors));
  }

  delete(path, options): Observable<any> {
    return this.http
      .delete(
        `${environment.api_url}${path}`,
        options
      )
      .pipe(catchError(this.formatErrors));
  }
}
