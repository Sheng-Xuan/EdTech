import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../services/tool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { TimeService } from '../../services/time.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ReviewService } from '../../services/review.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tool-page',
  templateUrl: './tool-page.component.html',
  styleUrls: ['./tool-page.component.css']
})
export class ToolPageComponent implements OnInit {
  toolId: number;
  defaultRating = 0;
  tool;
  toolLoading = true;
  selectedImage;
  myRating;
  myOriginalRating;
  rateButtonLoading = false;
  reviewLoading = true;
  reviews = [];
  constructor(
    private toolService: ToolService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private message: NzMessageService,
    private timeService: TimeService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.toolId = params['id'];
    });
    this.loadTool();
    this.loadReviews();
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

  onCommented(isCommented: boolean) {
    if (isCommented) {
      this.message.success('Commented successfully');
    } else {
      this.message.error('Error, please try again');
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
        this.titleService.setTitle('EdTech | Tool | ' + this.tool.name);
      },
      err => {
        console.error(err);
      }
    );
  }

  loadReviews() {
    this.toolService.getReviewsByToolId(this.toolId).subscribe(
      res => {
        this.reviews = res;
        this.reviewLoading = false;
      },
      err => {
        console.error(err);
      }
    );
  }

  onAddReview() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/review/publish/' + this.toolId);
    } else {
      this.messageService.sendMessage('login');
    }
  }
  getTime(time): string {
    return this.timeService.convertGMTToLocalTime(time);
  }
}
