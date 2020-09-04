import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = this.fb.group({
    newTodoName : ['', Validators.required],
    newTodoPass : ['', Validators.required]
  });
  constructor(private fb: FormBuilder , private auth: AuthService) { }

  ngOnInit(): void {
  }
  handelsunmit(): void{
    const user = {
      username: this.login.value.newTodoName,
      password: this.login.value.newTodoPass
    };
    this.auth.login( user ).subscribe(data => {
      console.log('login : ', data);
    }, error => console.log(error));
  }

}
