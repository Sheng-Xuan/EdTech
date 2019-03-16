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
    website,
    imageNames: string[]
  ): Observable<any> {
    return this.apiService.post(
      '/tool/create',
      {
        name: name,
        category: category,
        description: description,
        images: imageNames,
        website: website
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
    return this.apiService.get('/tools/list', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getRecommendedToolList(): Observable<any> {
    return this.apiService.get('/tools/recommended', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getAllTools(): Observable<any> {
    return this.apiService.get('/tools', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.jwtService.getToken()
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
    return this.apiService.get('/tool/comments/' + toolId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getReviewsByToolId(toolId): Observable<any> {
    return this.apiService.get('/tool/reviews/' + toolId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  searchTool(category, keyword): Observable<any> {
    return this.apiService.get('/tool/search/' + category + '/' + keyword, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateToolStatusById(id: number, status: number): Observable<any> {
    return this.apiService.put(
      '/tool/status',
      {
        toolId: id,
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

  updateToolRecommendedById(id: number, recommended: boolean): Observable<any> {
    return this.apiService.put(
      '/tool/recommended',
      {
        toolId: id,
        recommended: recommended
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.jwtService.getToken()
        })
      }
    );
  }

  getToolsByUser(id: number): Observable<any> {
    return this.apiService.get('/tools/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.jwtService.getToken()
      })
    });
  }

  getTopToolsByCategory(catId: number): Observable<any> {
    return this.apiService.get('/tools/top/' + catId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  deleteComment(id: number): Observable<any> {
    return this.apiService.delete('/tool/comment/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.jwtService.getToken()
      })
    });
  }
}
