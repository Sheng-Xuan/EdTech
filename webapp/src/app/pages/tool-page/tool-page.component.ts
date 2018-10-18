import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../services/tool.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { TimeService } from '../../services/time.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tool-page',
  templateUrl: './tool-page.component.html',
  styleUrls: ['./tool-page.component.css']
})
export class ToolPageComponent implements OnInit {
  private toolId: number;
  private defaultRating = 0;
  private tool;
  private toolLoading = true;
  private selectedImage;
  private myRating;
  private myOriginalRating;
  private rateButtonLoading = false;
  private newComment = '';
  private comments;
  private commentCount: number;
  private commentButtonLoading = false;
  private commentsLoading = true;
  constructor(
    private toolService: ToolService,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private timeService: TimeService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.toolId = params['id'];
    });
    this.loadTool();
    this.loadComments();
    if (this.userService.isLoggedIn()) {
      this.toolService.getMyRating(this.toolId).subscribe(res => {
        if (res) {
          this.myRating = res.score;
          this.myOriginalRating = res.score;
        }
      });
    }
  }

  getImageAddress(file) {
    return '/../files/' + file;
  }

  onImageSelect(file) {
    this.selectedImage = this.getImageAddress(file);
  }

  showDecimal(score: number) {
    if (score) {
      return Number(score).toFixed(1);
    } else {
      return null;
    }
  }

  submitRating() {
    if (this.userService.isLoggedIn()) {
      this.rateButtonLoading = true;
      if (this.myRating !== this.myOriginalRating) {
        this.toolService.postMyRating(this.toolId, this.myRating).subscribe(
          res => {
            this.myOriginalRating = this.myRating;
            this.rateButtonLoading = false;
            this.message.success('Rated successfully');
            this.loadTool();
          },
          err => {
            this.message.error('Error, please try agian');
            this.rateButtonLoading = false;
          }
        );
      }
    } else {
      this.messageService.sendMessage('login');
    }
  }

  submitComment() {
    if (this.userService.isLoggedIn()) {
      this.commentButtonLoading = true;
      if (this.newComment.length === 0) {
        return;
      }
      this.toolService.postComment(this.toolId, this.newComment).subscribe(
        res => {
          this.commentButtonLoading = false;
          this.newComment = '';
          this.message.success('Commented successfully');
          this.loadComments();
        },
        err => {
          this.commentButtonLoading = false;
          this.message.error('Error, please try again');
        }
      );
    } else {
      this.messageService.sendMessage('login');
    }
  }

  loadTool() {
    this.toolService.getTool(this.toolId).subscribe(
      res => {
        this.tool = res;
        console.log(this.tool);
        this.toolLoading = false;
        this.selectedImage = this.getImageAddress(
          this.tool.images[0].localFileName
        );
      },
      err => {
        console.error(err);
      }
    );
  }

  loadComments() {
    this.toolService.getToolComments(this.toolId).subscribe(
      res => {
        this.comments = res;
        this.commentsLoading = false;
      },
      err => {
        console.error(err);
      }
    );
  }

  getTime(time): string {
    return this.timeService.convertGMTToLocalTime(time);
  }
}
