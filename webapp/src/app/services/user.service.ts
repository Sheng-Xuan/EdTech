import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  // Get the currently logged in user
  getCurrentUser(): User {
    const userId = window.localStorage['userId'];
    const email = window.localStorage['email'];
    const username = window.localStorage['username'];
    const token = this.jwtService.getToken();
    const user: User = {
      userId: userId,
      email: email,
      username: username,
      token: token
    };
    if (userId && email && username && token) {
      return user;
    } else {
      return null;
    }
  }

  login(email, password): Observable<any> {
    return this.apiService.post('/login', {
      email: email,
      password: password
    });
  }

  setUser(user: User) {
    window.localStorage['userId'] = user.userId;
    window.localStorage['email'] = user.email;
    window.localStorage['username'] = user.username;
    this.jwtService.saveToken(user.token);
  }

  register(username, email, password): Observable<any> {
    return this.apiService.post('/register', {
      email: email,
      password: password,
      username: username
    });
  }

  logout() {
    this.jwtService.destoryToken();
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return this.jwtService.getToken() !== undefined;
  }
}
