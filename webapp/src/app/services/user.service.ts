import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { HttpHeaders } from '@angular/common/http';

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
    return this.apiService.post(
      '/login',
      {
        email: email,
        password: password
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  async setUser(user: User) {
    window.localStorage['userId'] = user.userId;
    window.localStorage['email'] = user.email;
    window.localStorage['username'] = user.username;
    this.jwtService.saveToken(user.token);
  }

  register(username, email, password): Observable<any> {
    return this.apiService.post(
      '/register',
      {
        email: email,
        password: password,
        username: username
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  logout() {
    this.jwtService.destroyToken();
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return this.jwtService.getToken() !== undefined;
  }

  getAllUsers(): Observable<any> {
    return this.apiService.get('/users', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.jwtService.getToken()
      })
    });
  }

  updateUserGroupById(id: number, isAdmin: boolean): Observable<any> {
    return this.apiService.put(
      '/user/group',
      {
        userId: id,
        isAdmin: isAdmin
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.jwtService.getToken()
        })
      }
    );
  }

  updateUserStatusById(id: number, status: number): Observable<any> {
    return this.apiService.put(
      '/user/status',
      {
        userId: id,
        status: status
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.jwtService.getToken()
        })
      }
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.apiService.put(
      '/user/password',
      {
        oldPassword: oldPassword,
        newPassword: newPassword
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.jwtService.getToken()
        })
      }
    );
  }

  verifyEmail(code: string, email: string): Observable<any> {
    return this.apiService.post(
      '/verification',
      {
        code: code,
        email: email
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  sendVerificationCode(email: string): Observable<any> {
    return this.apiService.post(
      '/forgotpassword/code',
      {
        email: email
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  checkVerificationCode(email: string, code: string): Observable<any> {
    return this.apiService.post(
      '/forgotpassword/verification',
      {
        email: email,
        code: code
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  resetPassword(newPassword: string, key: string, email: string): Observable<any> {
    return this.apiService.post(
      '/forgotpassword/newpassword',
      {
        email: email,
        password: newPassword,
        key: key
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
