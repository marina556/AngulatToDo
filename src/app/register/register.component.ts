import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register = this.fb.group({
    newTodoName : ['', Validators.required],
    newTodoPass : ['', Validators.required]
  });
  constructor(private fb: FormBuilder , private auth: AuthService) { }


  ngOnInit(): void {
  }
  handelsunmit(): void{
    const user = {
      username: this.register.value.newTodoName,
      password: this.register.value.newTodoPass
    };

    this.auth.register( user ).subscribe(data => {
      // console.log("not error : " ,data);
    }, error => console.log(error));
    // console.log('login error : ' , error);
  }

}
