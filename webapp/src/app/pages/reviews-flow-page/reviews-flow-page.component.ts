import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-reviews-flow-page',
  templateUrl: './reviews-flow-page.component.html',
  styleUrls: ['./reviews-flow-page.component.css']
})
export class ReviewsFlowPageComponent implements OnInit {
  data = [];
  offset = 0;
  pageSize = 8;
  loadTimes = 0;
  noMoreData = false;
  initLoading = true;
  loadingMore = false;
  constructor(
    private reviewService: ReviewService,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('EdTech | Reviews');
    this.reviewService.getReviewsFlow(this.pageSize * this.loadTimes).subscribe(
      res => {
        this.appendData(res);
        this.initLoading = false;
      },
      err => {
        console.error(err);
      }
    );
  }

  appendData(newData) {
    if (newData.length === this.pageSize) {
      this.data = this.data.concat(...newData);
    } else if (newData.length < this.pageSize) {
      this.data = this.data.concat(...newData);
      this.noMoreData = true;
    }
    this.loadTimes++;
  }

  onLoadMore() {
    this.loadingMore = true;
    if (!this.noMoreData) {
      this.reviewService
        .getReviewsFlow(this.pageSize * this.loadTimes)
        .subscribe(res => {
          this.appendData(res);
        });
    }
    this.loadingMore = false;
  }
}
