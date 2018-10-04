import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [UserService]
})
export class LoginFormComponent implements OnInit {
  validateForm: FormGroup;
  loginError: string;

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.email.valid && this.password.valid) {
      this.userService.login(this.email.value, this.password.value).subscribe(
        (user: User) => {
          this.userService.setUser(user);
          this.message.success(
            'Logged in successfully, page will refresh in 3 second...'
          );
          setTimeout(_ => {
            window.location.reload();
          }, 3000);
        },
        err => {
          this.loginError = err.error;
        }
      );
    }
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  get email() {
    return this.validateForm.get('email');
  }
  get password() {
    return this.validateForm.get('password');
  }
}
