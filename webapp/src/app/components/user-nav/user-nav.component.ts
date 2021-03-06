import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MessageService } from '../../services/message.service';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit, OnDestroy {
  private currentUser: User;
  private subscription: Subscription;
  private sizeSubscribe: Subscription;
  isMobile = window.innerWidth <= 800;
  constructor(
    private modalService: NzModalService,
    private userService: UserService,
    private messageService: MessageService,
    private noticification: NzMessageService,
  ) {
    this.subscription = this.messageService.getMessage().subscribe(res => {
      if (res.message === 'login') {
        this.openLoginModal();
      } else if (res.message === 'register') {
        this.openRegisterModal();
      }
    });
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.sizeSubscribe = fromEvent(window, 'resize').subscribe(event => {
      if (window.innerWidth <= 800) {
        this.isMobile = true;
      } else if (window.innerWidth > 800) {
        this.isMobile = false;
      }
    });
  }
  isLoginedIn(): boolean {
    return this.userService.isLoggedIn();
  }
  logout() {
    this.userService.logout();
    this.noticification.success('You are logged out.');
  }
  get username() {
    if (window.innerWidth <= 700) {
      return '';
    } else {
      return this.currentUser.username ? this.currentUser.username : '';
    }
  }

  openRegisterModal() {
    const modal = this.modalService.create({
      nzComponentParams: { action: 'register' },
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
      nzComponentParams: { action: 'login' },
      nzContent: AuthModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzBodyStyle: {
        padding: 0
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.sizeSubscribe.unsubscribe();
  }
}
