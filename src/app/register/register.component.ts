import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth.service';
import {Auth} from '../core/interfaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register = this.fb.group({
    newTodoName: ['', Validators.required],
    newTodoPass: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {
  }


  ngOnInit(): void {
  }

  handleSubmit(): void {
    const user: Auth = {
      username: this.register.value.newTodoName,
      password: this.register.value.newTodoPass
    };

    this.auth.register(user).subscribe(data => {
      localStorage.setItem('token', data.Token);
      console.log('reg :', data.Token);
    }, error => console.log(error));
  }

}
