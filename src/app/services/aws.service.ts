import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private http: HttpClient) { }

  usernameApi: string = 'https://jef3cgaxik.execute-api.us-east-2.amazonaws.com/dev/username';

  public getUsername(name: String) : Observable<any> {
    return this.http.get<any>(this.usernameApi)
      .pipe(
        catchError(this.handleError)
      );
  }

  public scanUsernames(str: Subject<string>) : Observable<any> {
    return this.http.get<any>(this.usernameApi + "?handle=" + str)
    .pipe(
      catchError(this.handleError)
    );
  }

  public triggerSearch(str: Observable<string>) {
    return str.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(str => this.scanDbForUsernames(str)));
  }

  public scanDbForUsernames(str) {
    return this.http
      .get(this.usernameApi + "/?handle=" + str)
      .pipe(map((response: any) => response.body));
  }

  private handleError (err: any) {
    console.error('API Failure: ', err);
    if (err.error instanceof Error) {
      const message = err.error.message;
      return Observable.throw(err.error.message);
    }
    return Observable.throw(err || 'api error ... ');
  }
}
