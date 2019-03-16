import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-report-bug-page',
  templateUrl: './report-bug-page.component.html',
  styleUrls: ['./report-bug-page.component.css']
})
export class ReportBugPageComponent implements OnInit {
  message = '';
  email = '';
  constructor(
    private userService: UserService,
    private messageService: NzMessageService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('EdTech | Report Bug');
  }

  report() {
    if (this.message && this.email) {
      this.userService.reportBug(this.email, this.message).subscribe(
        res => {
          this.messageService.success(
            'Bug is reported, thank you for your help.'
          );
        },
        err => {
          this.messageService.error(err.error);
        }
      );
    }
  }
}
