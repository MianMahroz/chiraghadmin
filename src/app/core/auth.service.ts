import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Headers,RequestOptions, Request, RequestMethod} from '@angular/http';
import { TokenStorage } from './token.storage';
@Injectable()
export class AuthService {

  constructor(private http: HttpClient,private token:TokenStorage) {
  }

  attemptAuth(): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('chiragh-client' + ':' + 'devglan-secret'),
        'Access-Control-Allow-Origin':'*',
    })
};

  let data = "username=" + 'Chiragh' + "&password=" +'password'+"&grant_type=password&" +
            "client_secret=devglan-secret&client_id=chiragh-client";

    // console.log('Getting Chiragh OAuth 2  Token');
    return this.http.post<any>(this.token.getServerpath()+'/oauth/token', data,httpOptions);
  }

  attemptAuthRefresh(refreshToken:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa('chiragh-client' + ':' + 'devglan-secret')
      })
  };

    let data = "username=" + 'Chiragh' + "&password=" +'password'+"&grant_type=refresh_token&" +
              "client_secret=devglan-secret&client_id=chiragh-client&refresh_token="+refreshToken;

      console.log('Refreshing Chiragh OAuth 2  Token');
      return this.http.post<any>(this.token.getServerpath()+'/oauth/token', data,httpOptions);
    }
}
