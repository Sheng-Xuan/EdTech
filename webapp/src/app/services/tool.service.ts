import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  publishTool(
    name,
    category,
    description,
    imageNames: string[]
  ): Observable<any> {
    return this.apiService.post(
      '/tool/create',
      {
        name: name,
        category: category,
        description: description,
        images: imageNames
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.jwtService.getToken()
        })
      }
    );
  }

  getCategories(): Observable<any> {
    return this.apiService.get('/categories', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getToolList(): Observable<any> {
    return this.apiService.get('/tool/list', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getTool(id): Observable<any> {
    return this.apiService.get('/tool/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getMyRating(toolId): Observable<any> {
    return this.apiService.get('/tool/myrating/' + toolId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.jwtService.getToken()
      })
    });
  }

  postMyRating(toolId, score): Observable<any> {
    return this.apiService.post(
      '/tool/myrating/',
      {
        toolId: toolId,
        score: score
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.jwtService.getToken()
        })
      }
    );
  }

  postComment(toolId, comment): Observable<any> {
    return this.apiService.post(
      '/tool/comment/',
      {
        toolId: toolId,
        comment: comment
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.jwtService.getToken()
        })
      }
    );
  }

  getToolComments(toolId): Observable<any> {
    return this.apiService.get('/tool/comment/' + toolId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}
