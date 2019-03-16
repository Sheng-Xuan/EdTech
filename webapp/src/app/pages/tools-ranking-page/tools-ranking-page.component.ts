import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToolService } from 'src/app/services/tool.service';
import { fromEvent  } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tools-ranking-page',
  templateUrl: './tools-ranking-page.component.html',
  styleUrls: ['./tools-ranking-page.component.css']
})
export class ToolsRankingPageComponent implements OnInit {
  categories = [{ id: 0, name: 'All' }];
  topTools = [];
  nzTabPosition = 'left';
  selectedIndex = 0;
  constructor(private toolService: ToolService, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('EdTech | Top Tools');
    if (window.innerWidth <= 800) {
      this.nzTabPosition = 'top';
    }
    fromEvent(window, 'resize').subscribe(event => {
      if (window.innerWidth <= 800) {
        this.nzTabPosition = 'top';
      } else if (window.innerWidth > 800) {
        this.nzTabPosition = 'left';
      }
    });
    this.toolService.getCategories().subscribe(res => {
      this.categories = [...this.categories, ...res];
      this.topTools = this.categories.map(x => {
        return [];
      });
    });
    this.toolService.getTopToolsByCategory(0).subscribe(
      res => {
        this.topTools[0] = res;
        this.topTools = [...this.topTools];
      },
      err => {}
    );
  }

  getTools(catId) {
    if (this.topTools[catId].length > 0) {
    } else {
      this.toolService.getTopToolsByCategory(catId).subscribe(
        res => {
          this.topTools[catId] = res;
          this.topTools = [...this.topTools];
        },
        err => {}
      );
    }
  }
}
