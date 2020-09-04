import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(user: object){
    return this.http.post(`${environment.apiUrl}/auth/login`, user );
  }

  register(user: object){
    return this.http.post(`${environment.apiUrl}/auth/register`, user );

  }
  getToken(){
    return localStorage.getItem('token');
  }
}
