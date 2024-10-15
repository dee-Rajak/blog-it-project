import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthCredentials } from '../pages/login-page/login-page.component';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: AuthCredentials): Observable<any> {
    return this.http.post<any>('https://localhost:7189/api/Auth/login', credentials).pipe(
      tap(response => {
        if (response.Token) {
          debugger;
          localStorage.setItem('token', response.Token);
          localStorage.setItem('userId', response.Id.toString());
          localStorage.setItem('userName', response.Name);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    debugger;
    localStorage.clear();
    debugger;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUserName() {
    return localStorage.getItem('userName');
  }
}
