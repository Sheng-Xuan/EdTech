import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'app-tool-list-page',
  templateUrl: './tool-list-page.component.html',
  styleUrls: ['./tool-list-page.component.css']
})
export class ToolListPageComponent implements OnInit {
  category;
  keyword: string;
  data;
  constructor(private route: ActivatedRoute, private toolService: ToolService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.keyword = params['keyword'];
    });
    this.toolService.searchTool(this.category, this.keyword).subscribe(
      res => {
        this.data = res;
      }
    );
  }

  getImagePath(image) {
    if (image) {
      return '/files/' + image.localFileName;
    } else {
      return 'assets/img-not-available.jpg';
    }
  }

}
