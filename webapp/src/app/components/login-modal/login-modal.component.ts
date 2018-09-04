import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(private modal: NzModalRef) { }

  ngOnInit() {
  }

}
