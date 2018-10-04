import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private apiService: ApiService, private jwtService: JwtService) { }

  publishTool(name, category, description, imageNames: string[]): Observable<any> {
    return this.apiService.post('/tool/create', {
      name: name,
      category: category,
      description: description,
      images: imageNames
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.jwtService.getToken()
      })
    });
  }

  getToolList(): Observable<any> {
    return this.apiService.get('/tool/list', false);
  }
}
