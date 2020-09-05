import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth.service';
import {Auth} from '../core/interfaces/auth';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;

  login = this.fb.group({
    newTodoName: ['', Validators.required],
    newTodoPass: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private route: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  confirm(): void {
    this.login.reset();
    this.modalRef.hide();
  }

  handleSubmit(temp: TemplateRef<object>): void {
    const user: Auth = {
      username: this.login.value.newTodoName,
      password: this.login.value.newTodoPass
    };
    this.auth.login(user).subscribe(data => {
      this.auth.isLogin = true;
      this.route.navigate(['/home']);
    }, error => {
      if (error.error.message === 'Unauthorized') {
        this.modalRef = this.modalService.show(temp, {class: 'modal-sm'});
      }
    });
  }
}
