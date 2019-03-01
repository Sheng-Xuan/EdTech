import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.css']
})
export class ToolListComponent implements OnInit {

  constructor() { }

  @Input()
  data: object;

  ngOnInit() {
  }

  getImagePath(image) {
    if (image) {
      return '/files/' + image.localFileName;
    } else {
      return 'assets/img-not-available.jpg';
    }
  }

}
