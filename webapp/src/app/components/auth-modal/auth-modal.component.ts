import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  @Input()
  action: string;

  constructor() {}

  ngOnInit() {}

  onRegisterSucceed(isSuccessful: boolean) {
    if (isSuccessful) {
      this.action = 'login';
    }
  }

  getAction() {
    return this.action === 'login' ? 'Login' : 'Register';
  }
  getNextAction() {
    return this.action === 'login' ? 'Register' : 'Login';
  }
  getNextActionText() {
    return this.action === 'login' ? 'Not register yet? ' : 'Already registered? ';
  }
  switchAction() {
    this.action = this.action === 'login' ? 'register' : 'login';
  }
}
