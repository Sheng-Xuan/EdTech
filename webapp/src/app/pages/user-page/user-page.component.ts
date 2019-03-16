import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from 'src/app/models/user.model';
import { TimeService } from 'src/app/services/time.service';
import { ToolService } from 'src/app/services/tool.service';
import { MapType } from '@angular/compiler';
import { ReviewService } from 'src/app/services/review.service';
import { MessageService } from 'src/app/services/message.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  selectedTab = 'account';
  validateForm: FormGroup;
  isChangingPassword = false;
  user: User;
  myTools = [];
  myReviews = [];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private timeService: TimeService,
    private toolService: ToolService,
    private reviewService: ReviewService,
    private messageService: MessageService,
    private titleService: Title
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

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.titleService.setTitle('EdTech | User Center');
  }
  setContent(tab: string) {
    this.selectedTab = tab;
    if (this.selectedTab === 'tools') {
      this.loadTools();
    }
    if (this.selectedTab === 'reviews') {
      this.loadReviews();
    }
    this.validateForm.reset();
    this.isChangingPassword = false;
  }

  loadTools() {
    this.toolService.getToolsByUser(this.user.userId).subscribe(
      res => {
        this.myTools = res;
      },
      err => {
        if (err.error = 'Unauthorized') {
          this.message.error('Session timeout, please log in again');
          this.messageService.sendMessage('login');
        } else {
          this.message.error(err.error);
        }
      }
    );
  }

  loadReviews() {
    this.reviewService.getReviewsByUserId(this.user.userId).subscribe(
      res => {
        this.myReviews = res;
      },
      err => {
        if (err.error = 'Unauthorized') {
          this.message.error('Session timeout, please log in again');
          this.messageService.sendMessage('login');
        } else {
          this.message.error(err.error);
        }
      }
    );
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
          this.message.success('Password is updated');
          this.validateForm.reset();
        },
        err => {
          if (err.error = 'Unauthorized') {
            this.message.error('Session timeout, please log in again');
            this.messageService.sendMessage('login');
          } else {
            this.message.error(err.error);
          }
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

  displayToolStatus(status) {
    switch (status) {
      case 0:
        return 'Normal';
      case 1:
        return 'Pending';
      case 2:
        return 'Deleted';
      default:
        return 'Unknown';
    }
  }

  displayTime(time: string) {
    return this.timeService.convertGMTToLocalTime(time);
  }
}
