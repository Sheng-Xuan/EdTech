import { Component, OnInit } from '@angular/core';
import { UploadFile, UploadXHRArgs, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { ToolService } from '../../services/tool.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-tool-publish-page',
  templateUrl: './tool-publish-page.component.html',
  styleUrls: ['./tool-publish-page.component.css']
})
export class ToolPublishPageComponent implements OnInit {
  publishForm: FormGroup;
  fileList = [];
  previewVisible = false;
  previewImage = '';
  categories = [];
  constructor(
    private formGroup: FormBuilder,
    private imageService: ImageService,
    private msg: NzMessageService,
    private messageService: MessageService,
    private toolService: ToolService,
    private router: Router,
    private titleService: Title
  ) {}

  uploadImage = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('image', item.file as any);
    return this.imageService.uploadImage(formData).subscribe(
      (res: Response) => {
        item.onSuccess(res, item.file, event);
      },
      err => {
        if (err.error = 'Unauthorized') {
          this.msg.error('Session timeout, please log in again');
          this.messageService.sendMessage('login');
        } else {
          this.msg.error('Upload image failed, please retry');
          item.onError(err, item.file);
          this.fileList = this.fileList.filter(file => file.status !== 'error');
        }
      }
    );
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.response.url;
    this.previewVisible = true;
  }

  uploadCheck = (file: UploadFile) => {
    // Format check
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      this.msg.error('Only support jpeg, png and gif format images');
      return false;
    } else if (file.size > 1024 * 1024) {
      this.msg.error('Please upload image with size not larger than 1MB');
      return false;
    }
  }

  submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.publishForm.controls) {
      this.publishForm.controls[i].markAsDirty();
      this.publishForm.controls[i].updateValueAndValidity();
    }
    if (this.name.valid && this.category.valid && this.description.valid && this.website.valid) {
      this.toolService
        .publishTool(
          this.name.value,
          this.category.value,
          this.description.value,
          this.website.value,
          this.fileList.map(file => file.response.fileName)
        )
        .subscribe(
          res => {
            if (res.message === 'pending') {
              this.msg.success('Tool publish request is submitted, please wait for admin to approve.');
              this.router.navigateByUrl('/');
            } else {
              this.router.navigateByUrl('/tool/' + res.toolId);
            }
          },
          err => {
            if (err.error = 'Unauthorized') {
              this.msg.error('Session timeout, please log in again');
              this.messageService.sendMessage('login');
            } else {
              this.msg.error(err.error);
            }
          }
        );
    }
  }

  ngOnInit() {
    this.titleService.setTitle('EdTech | Publish Tool');
    this.toolService.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {
        console.error(err);
      }
    );
    this.publishForm = this.formGroup.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
      images: [null],
      website: [null, [Validators.pattern('^https?:\/\/(.*)')]]
    });
  }

  get name() {
    return this.publishForm.get('name');
  }
  get category() {
    return this.publishForm.get('category');
  }
  get images() {
    return this.publishForm.get('images');
  }
  get description() {
    return this.publishForm.get('description');
  }
  get website() {
    return this.publishForm.get('website');
  }
}
