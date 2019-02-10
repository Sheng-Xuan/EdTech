import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [UserService]
})
export class RegisterFormComponent implements OnInit {
  validateForm: FormGroup;
  registerError: string;
  @Output()
  changeToLogin = new EventEmitter<boolean>();

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.canRegister()) {
      this.userService
        .register(this.username.value, this.email.value, this.password.value)
        .subscribe(
          (body: Response) => {
            this.message.success(
              'Registered successfully, we have sent an email to your email address. Please verify your email before login.'
            , { nzDuration: 0 });
            this.changeToLogin.emit(true);
          },
          err => {
            this.registerError = err.error;
          }
        );
    }
  }

  validateTwoPasswords(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const repeat = formGroup.get('checkPassword');
    if (repeat.errors && repeat.errors.required) {
      return null;
    } else if (password.value !== repeat.value) {
      repeat.setErrors({ notSame: true });
    } else {
      repeat.setErrors(null);
    }
    return null;
  }

  canRegister(): boolean {
    let noError = true;
    Object.keys(this.validateForm.controls).forEach(key => {
      if (
        this.validateForm.get(key).value == null ||
        this.validateForm.get(key).errors != null
      ) {
        noError = false;
      }
    });
    return noError;
  }

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    this.validateForm = this.formbuilder.group(
      {
        email: [null, [Validators.email, Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        checkPassword: [null, [Validators.required]],
        username: [
          null,
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.-]*$'),
            Validators.maxLength(20)
          ]
        ]
      },
      { validator: [this.validateTwoPasswords] }
    );
  }
  get email() {
    return this.validateForm.get('email');
  }
  get password() {
    return this.validateForm.get('password');
  }
  get checkPassword() {
    return this.validateForm.get('checkPassword');
  }
  get username() {
    return this.validateForm.get('username');
  }
}
