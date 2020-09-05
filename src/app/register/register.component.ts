import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth.service';
import {Auth} from '../core/interfaces/auth';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  modalRef: BsModalRef;
  register = this.fb.group({
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
    this.register.reset();
    this.modalRef.hide();
  }

  handleSubmit(temp: TemplateRef<object>): void {
    const user: Auth = {
      username: this.register.value.newTodoName,
      password: this.register.value.newTodoPass
    };

    this.auth.register(user).subscribe(data => {
      this.auth.isLogin = true;
      this.route.navigate(['/home']);
    }, error => {
      if (error.error.message === 'username exists') {
        this.modalRef = this.modalService.show(temp, {class: 'modal-sm'});
      }
    });
  }

}
