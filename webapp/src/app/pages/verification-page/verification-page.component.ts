import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageService } from 'src/app/services/message.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-verification-page',
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.css']
})
export class VerificationPageComponent implements OnInit {
  email = '';
  code = '';
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private nzMessageService: NzMessageService,
    private messageService: MessageService,
    private titleService: Title
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      this.code = params['code'];
    });
  }

  ngOnInit() {
    this.titleService.setTitle('EdTech | Verification');
    if (this.email && this.code) {
      this.userService.verifyEmail(this.code, this.email).subscribe(
        res => {
          this.messageService.sendMessage('login');
          this.nzMessageService.success('Your account is verified, please login.');
        },
        err => {
          this.router.navigateByUrl('/notfound');
        }
      );
    }
  }
}
