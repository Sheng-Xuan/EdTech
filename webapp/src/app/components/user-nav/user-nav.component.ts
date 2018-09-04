import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  constructor(private modalService: NzModalService) { }

  ngOnInit() {
  }

  openRegisterModal() {
    const modal = this.modalService.create({
      nzTitle: 'Register',
      nzContent: RegisterModalComponent,
      nzFooter: null
    });
  }

}
