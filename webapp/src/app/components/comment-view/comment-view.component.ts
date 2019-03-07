import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolService } from '../../services/tool.service';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { TimeService } from '../../services/time.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css']
})
export class CommentViewComponent implements OnInit {
  @Input()
  type: string;
  @Input()
  id: number;
  @Output()
  commented = new EventEmitter<boolean>();

  comments = [];
  commentsLoading;
  commentButtonLoading = false;
  newComment: string;

  constructor(
    private toolService: ToolService,
    private reviewService: ReviewService,
    private userService: UserService,
    private msg: NzMessageService,
    private messageService: MessageService,
    private timeService: TimeService
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    let apiCall;
    if (this.type === 'tool') {
      apiCall = this.toolService.getToolComments(this.id);
    } else if (this.type === 'review') {
      apiCall = this.reviewService.getReviewComments(this.id);
    }
    if (apiCall) {
      this.commentsLoading = true;
      apiCall.subscribe(
        res => {
          this.comments = res;
          this.commentsLoading = false;
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  submitComment() {
    if (this.userService.isLoggedIn()) {
      this.commentButtonLoading = true;
      if (this.newComment.length === 0) {
        return;
      }
      let apiCall;
      if (this.type === 'tool') {
        apiCall = this.toolService.postComment(this.id, this.newComment);
      } else if (this.type === 'review') {
        apiCall = this.reviewService.postComment(this.id, this.newComment);
      }
      if (apiCall) {
        apiCall.subscribe(
          res => {
            this.commentButtonLoading = false;
            this.newComment = '';
            this.commented.emit(true);
            this.loadComments();
          },
          err => {
            if (err.error = 'Unauthorized') {
              this.msg.error('Session timeout, please log in again');
              this.messageService.sendMessage('login');
            } else {
              this.msg.error(err.error);
            }
            this.commentButtonLoading = false;
          }
        );
      }
    } else {
      this.messageService.sendMessage('login');
    }
  }

  getTime(time): string {
    return this.timeService.convertGMTToLocalTime(time);
  }
}
