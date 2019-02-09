import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  private selectedTab = 'account';
  validateForm: FormGroup;
  isChangingPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
  ) {
    this.validateForm = this.formBuilder.group(
      {
        oldPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required, Validators.minLength(8)]],
        checkPassword: [null, [Validators.required]],
      },
      { validator: [this.validatePasswords] }
    );
  }

  ngOnInit() {}
  setContent(tab: string) {
    this.selectedTab = tab;
    this.validateForm.reset();
    this.isChangingPassword = false;
    console.log(this.selectedTab);
  }

  changePassword(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.oldPassword.valid && this.newPassword.valid) {
      this.isChangingPassword = true;
      this.isChangingPassword = false;
      this.userService.changePassword(this.oldPassword.value, this.newPassword.value).subscribe(
        res => {
          console.log(res);
          this.message.success('Password is updated');
          this.validateForm.reset();
        },
        err => {
          console.log(err);
          this.isChangingPassword = false;
          this.validateForm.get('oldPassword').setErrors({ wrong: true });
        }
      );
    }
  }

  validatePasswords(formGroup: FormGroup) {
    const oldPassword = formGroup.get('oldPassword');
    const password = formGroup.get('newPassword');
    const repeat = formGroup.get('checkPassword');
    if (oldPassword.value === password.value) {
      password.setErrors({ notNew: true });
    } else if (repeat.errors && repeat.errors.required) {
      return null;
    } else if (password.value !== repeat.value) {
      repeat.setErrors({ notSame: true });
    } else {
      repeat.setErrors(null);
    }
    return null;
  }

  get oldPassword() {
    return this.validateForm.get('oldPassword');
  }
  get newPassword() {
    return this.validateForm.get('newPassword');
  }
  get checkPassword() {
    return this.validateForm.get('checkPassword');
  }
}
