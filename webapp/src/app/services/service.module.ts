import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { ReviewService } from './review.service';
import { JwtService } from './jwt.service';
import { CommentService } from './comment.service';

@NgModule({
  imports: [],
  providers: [
    ApiService,
    UserService,
    ReviewService,
    JwtService,
    CommentService
  ]
})
export class ServiceModule {}
