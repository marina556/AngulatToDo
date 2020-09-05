import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth.service';
import {Auth} from '../core/interfaces/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = this.fb.group({
    newTodoName: ['', Validators.required],
    newTodoPass: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private route: Router) {
  }

  ngOnInit(): void {
  }

  handelsunmit(): void {
    const user: Auth = {
      username: this.login.value.newTodoName,
      password: this.login.value.newTodoPass
    };
    this.auth.login(user).subscribe(data => {
      this.auth.isLogin = true;
      this.route.navigate(['/home']);
      console.log(data.access_token);
    }, error => console.log(error));
  }
}
