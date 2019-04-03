import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { ToolService } from '../../services/tool.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  cardStyle = {
    height: '200px',
    'background-size': 'cover',
    'background-position': 'center',
    'background-repeat': 'no-repeat'
  };
  recommendationLoaded = false;
  reviewsLoaded = false;
  searchCategory = 0;
  searchText = '';
  categories = [];
  recommendedTools: Array<any>;
  reviews: Array<any>;
  carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 2, sm: 2, md: 4, lg: 5, all: 0 },
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: true,
    interval: { timing: 5000 },
    animation: 'lazy'
  };
  reviewTileConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 2, lg: 3, all: 0 },
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: true,
    interval: { timing: 5000 },
    animation: 'lazy'
  };
  constructor(
    private cdr: ChangeDetectorRef,
    private toolService: ToolService,
    private router: Router,
    private titleService: Title,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('EdTech | Home Page');
    this.toolService.getRecommendedToolList().subscribe(res => {
      this.recommendedTools = res;
      this.recommendationLoaded = true;
      this.cdr.detectChanges();
    });
    this.toolService.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.reviewService.getNewReviews().subscribe(res => {
      this.reviews = res;
      this.reviewsLoaded = true;
      this.cdr.detectChanges();
    });
  }
  getImagePath(image) {
    if (image) {
      return '/files/' + image.localFileName;
    } else {
      return 'assets/img-not-available.jpg';
    }
  }

  search() {
    if (this.searchText) {
      this.router.navigateByUrl('/search/' + this.searchCategory + '/' + this.searchText);
    }
  }
}
