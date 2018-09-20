import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  private currentUser: User;
  constructor(private modalService: NzModalService, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }
  isLoginedIn(): boolean {
    return this.userService.isLoggedIn();
  }
  logout() {
    this.userService.logout();
  }
  get username() {
    return this.currentUser.username ? this.currentUser.username : 'unknown';
  }

  openRegisterModal() {
    const modal = this.modalService.create({
      nzComponentParams: {action: 'register'},
      nzContent: AuthModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzBodyStyle: {
        padding: 0
      }
    });
  }
  openLoginModal() {
    const modal = this.modalService.create({
      nzComponentParams: {action: 'login'},
      nzContent: AuthModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzBodyStyle: {
        padding: 0
      }
    });
  }

}
