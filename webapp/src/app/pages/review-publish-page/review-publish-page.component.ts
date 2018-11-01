import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import { ImageUpload } from 'quill-image-upload';
import ImageResize from 'quill-image-resize-module';
import { JwtService } from '../../services/jwt.service';
import { ToolService } from '../../services/tool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';

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
// Add image uploader
Quill.register('modules/imageUpload', ImageUpload);
// add image resize module
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-review-publish-page',
  templateUrl: './review-publish-page.component.html',
  styleUrls: ['./review-publish-page.component.css']
})
export class ReviewPublishPageComponent implements OnInit {
  modules = {};
  isImageUploaderVisible = false;
  title;
  toolId;
  content;
  tool;
  toolLoaded = false;
  images = [];
  constructor(
    private jwtService: JwtService,
    private toolService: ToolService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
        ['link', 'image', 'video'] // link and image, video
      ],
      imageUpload: {
        url: `${environment.api_url}` + '/image',
        method: 'POST',
        headers: { Authorization: 'Bearer ' + this.jwtService.getToken() },
        // successful callback and call next function to insert new url to the editor
        callbackOK: (serverResponse, next) => {
          // add url returned to editor
          next(serverResponse.url);
          this.images.push(serverResponse.fileName);
        },
        // failed callback
        callbackKO: serverError => {
          alert(serverError);
        },
        // optional
        // add callback when a image have been chosen
        checkBeforeSend: (file, next) => {
          next(file); // go back to component and send to the server
        }
      },
      imageResize: {}
    };
  }
  ngOnInit() {
    this.loadTool();
  }

  loadTool() {
    this.route.params.subscribe(params => {
      this.toolId = params['id'];
    });
    this.toolService.getTool(this.toolId).subscribe(
      res => {
        this.tool = res;
        this.toolLoaded = true;
      },
      err => {
        console.error(err);
      }
    );
  }

  canPublish() {
    return this.title && this.content;
  }

  isLoggedin() {
    return this.userService.isLoggedIn();
  }

  publish() {
    // Check if image is deleted
    this.images = this.images.filter(imageName => this.content.search(imageName) >= 0);
    this.reviewService.publishReview(this.toolId, this.title, this.content, this.images).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('/review/' + res.reviewId);
      },
      err => {
        console.log(err);
      }
    );
  }
}
