import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ToolPublishPageComponent } from './tool-publish-page/tool-publish-page.component';
import { ToolPageComponent } from './tool-page/tool-page.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { RouterModule } from '@angular/router';
import { ReviewPublishPageComponent } from './review-publish-page/review-publish-page.component';
import { QuillModule } from 'ngx-quill';
import { ReviewPageComponent } from './review-page/review-page.component';
import { CommentViewComponent } from '../components/comment-view/comment-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NguCarouselModule } from '@ngu/carousel';
import { ToolListPageComponent } from './tool-list-page/tool-list-page.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    BarRatingModule,
    RouterModule,
    QuillModule,
    NguCarouselModule
  ],
  declarations: [
    ToolPublishPageComponent,
    ToolPageComponent,
    ReviewPublishPageComponent,
    ReviewPageComponent,
    CommentViewComponent,
    HomePageComponent,
    ToolListPageComponent
  ]
})
export class PagesModule {}
