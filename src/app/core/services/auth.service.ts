import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Auth} from '../interfaces/auth';
import {UserToken} from '../interfaces/user-token';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin: boolean;

  constructor(private http: HttpClient, private route: Router) {
    this.isLogin = !!localStorage.getItem('token');
  }

  login(user: Auth): Observable<UserToken> {
    return this.http.post<UserToken>(`${environment.apiUrl}/auth/login`, user).pipe(
      tap(data => {
        localStorage.setItem('token', data.access_token);
      })
    );
  }

  register(user: Auth): Observable<UserToken> {
    return this.http.post<UserToken>(`${environment.apiUrl}/auth/register`, user).pipe(
      tap(data => {
        localStorage.setItem('token', data.access_token);
      }));
  }

  logOutUser(): void{
    localStorage.removeItem('token');
    this.route.navigate([`/login`]);
  }
}
