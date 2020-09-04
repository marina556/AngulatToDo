import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Auth} from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: Auth) {
    return this.http.post(`${environment.apiUrl}/auth/login`, user);
  }

  register(user: Auth) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);

  }

  getToken() {
    return localStorage.getItem('token');
  }
}
