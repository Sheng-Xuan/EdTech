import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {
  // Indicate if the page is forgot page or reset password page.
  // 0: send & verify code
  // 1: set new password
  // 2: done
  step = 0;
  countInSecounds: Observable<number>;
  firstStepForm: FormGroup;
  secondStepForm: FormGroup;
  message = '';
  isVerifyingCode = false;
  verificationError = '';
  isChangingPassword = false;
  isSendingEmail = false;
  key = '';
  emailToChange = '';
  timer = 30;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: NzMessageService
  ) {
    this.firstStepForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      verification: [null, [Validators.required]]
    });
    this.secondStepForm = this.formBuilder.group(
      {
        newPassword: [null, [Validators.required, Validators.minLength(8)]],
        checkPassword: [null, [Validators.required]]
      },
      { validator: [this.validatePasswords] }
    );
  }

  ngOnInit() {}

  sendCode() {
    this.isSendingEmail = true;
    if (this.email.valid) {
      this.userService.sendVerificationCode(this.email.value).subscribe(
        res => {
          this.message = res.message;
          this.isSendingEmail = false;
        },
        err => {
          this.message = err.error;
          this.isSendingEmail = false;
        }
      );
    } else {
      this.email.setErrors({ required: true });
    }
  }

  countDown() {
    this.timer--;
    if (this.timer === 0) {
      this.timer = 60;
      this.isSendingEmail = false;
    }
  }
  resetMessage() {
    if (this.message) {
      this.message = '';
    }
  }
  verificationCode() {
    // tslint:disable-next-line:forin
    for (const i in this.firstStepForm.controls) {
      this.firstStepForm.controls[i].markAsDirty();
      this.firstStepForm.controls[i].updateValueAndValidity();
    }
    if (this.email.valid && this.verification.valid) {
      this.isVerifyingCode = true;
      this.userService
        .checkVerificationCode(this.email.value, this.verification.value)
        .subscribe(
          res => {
            this.key = res.key;
            if (this.key) {
              this.step = 1;
              this.emailToChange = this.email.value;
            }
            this.isVerifyingCode = false;
          },
          err => {
            this.verificationError = err.error;
            this.isVerifyingCode = false;
          }
        );
    }
  }

  changePassword() {
    // tslint:disable-next-line:forin
    for (const i in this.secondStepForm.controls) {
      this.secondStepForm.controls[i].markAsDirty();
      this.secondStepForm.controls[i].updateValueAndValidity();
    }
    if (this.newPassword.valid && this.checkPassword.valid) {
      this.isChangingPassword = true;
      this.userService
        .resetPassword(this.newPassword.value, this.key, this.emailToChange)
        .subscribe(res => {
          this.step = 2;
        },
        err => {
          this.step = 1;
          this.verification.setValue('');
          this.messageService.error(err.error);
        });
    }
  }

  validatePasswords(formGroup: FormGroup) {
    const password = formGroup.get('newPassword');
    const repeat = formGroup.get('checkPassword');
    if (password.value !== repeat.value) {
      repeat.setErrors({ notSame: true });
    } else {
      repeat.setErrors(null);
    }
  }

  get email() {
    return this.firstStepForm.get('email');
  }
  get verification() {
    return this.firstStepForm.get('verification');
  }
  get newPassword() {
    return this.secondStepForm.get('newPassword');
  }
  get checkPassword() {
    return this.secondStepForm.get('checkPassword');
  }
}
