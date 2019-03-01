import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-box',
  templateUrl: './review-box.component.html',
  styleUrls: ['./review-box.component.css']
})
export class ReviewBoxComponent implements OnInit {

  @Input()
  data: any;

  constructor() { }

  ngOnInit() {
  }

  getImagePath(review): string {
    if (review && review.images.length > 0) {
      return '/files/' + review.images[0].localFileName;
    } else if (review.tool.images.length > 0) {
      return '/files/' + review.tool.images[0].localFileName;
    } else {
      return 'assets/img-not-available.jpg';
    }
  }

  getId() {
    if (this.data && this.data.reviewId) {
      return this.data.reviewId;
    }
    return '';
  }

}
