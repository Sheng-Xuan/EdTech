import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
import { Title } from '@angular/platform-browser';

// override p with div tag
const Parchment = Quill.import('parchment');
const Block = Parchment.query('block');
Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

// Add fonts to whitelist
const Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref', 'sans-serif', 'monospace', 'serif'];
Quill.register(Font, true);
// add image resize module
Quill.register('modules/imageResize', ImageResize);
@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  content;
  reviewId;
  review;
  reviewLoaded = false;
  modules;
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private titleService: Title
  ) {
    this.modules = {
      toolbar: false,
      imageResize: {}
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reviewId = params['id'];
    });
    this.reviewService.getReviewById(this.reviewId).subscribe(
      res => {
        this.review = res;
        this.reviewLoaded = true;
        this.titleService.setTitle('EdTech | Review | ' + this.review.title);
      },
      err => {
        console.error(err);
      }
    );
  }
  onCommented(isCommented: boolean) {
    if (isCommented) {
      this.message.success('Commented successfully');
    } else {
      this.message.error('Error, please try again');
    }
  }
}

// Begin allow image alignment styles
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];

const BaseImageFormat = Quill.import('formats/image');
class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Quill.register(ImageFormat, true);
// End allow image alignment styles
