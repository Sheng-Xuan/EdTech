import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private apiService: ApiService, private jwtService: JwtService) { }

  uploadImage(formData: FormData): Observable<any> {
    return this.apiService.postData('/image', formData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.jwtService.getToken()
      })
    });
  }
}
