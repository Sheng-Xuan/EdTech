import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { ToolService } from '../../services/tool.service';
import { Router } from '@angular/router';

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
  recommandationLoaded = false;
  searchCategory = 0;
  searchText = '';
  categories = [];
  recommandedTools: Array<any>;
  carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 4, lg: 6, all: 0 },
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
  ) {}

  ngOnInit() {
    this.toolService.getRecommandedToolList().subscribe(res => {
      this.recommandedTools = res;
      this.recommandationLoaded = true;
      this.cdr.detectChanges();
    });
    this.toolService.getCategories().subscribe(res => {
      this.categories = res;
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
