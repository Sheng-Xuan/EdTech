import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  publishReview(
    id: number,
    title: string,
    content: string,
    pureText: string,
    images: string[]
  ): Observable<any> {
    return this.apiService.post(
      '/review/create/' + id,
      {
        title: title,
        content: content,
        pureText: pureText,
        images: images
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.jwtService.getToken()
        })
      }
    );
  }
  getReviewById(id: number): Observable<any> {
    return this.apiService.get('/review/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  postComment(commentId, comment): Observable<any> {
    return this.apiService.post(
      '/review/comment/',
      {
        commentId: commentId,
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

  getReviewComments(reviewId): Observable<any> {
    return this.apiService.get('/review/comments/' + reviewId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getReviewsByUserId(userId: number): Observable<any> {
    return this.apiService.get('/reviews/' + userId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.jwtService.getToken()
      })
    });
  }

  getNewReviews(): Observable<any> {
    return this.apiService.get('/reviews/new', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getReviewsFlow(offset: number): Observable<any> {
    return this.apiService.get('/reviews/flow/' + offset, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  putVisit(reviewId: number): Observable<any> {
    return (
      this.apiService.put('/reviews/visit/' + reviewId,
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ));
  }
}
