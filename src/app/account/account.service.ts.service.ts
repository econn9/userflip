import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  usernameApi: string = 'https://jef3cgaxik.execute-api.us-east-2.amazonaws.com/dev/username';
  userApi: string = 'https://jef3cgaxik.execute-api.us-east-2.amazonaws.com/dev/user';

  public getUsername(name: String) : Observable<any> {
    return this.http.get<any>(this.usernameApi)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createProfile(id: string, profile: Object) : Observable<any> {
    return this.http.post<any>(this.userApi, profile)
    .pipe(
      catchError(this.handleError)
    );
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
