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
import { ErrorPageComponent } from './error-page/error-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { VerificationPageComponent } from './verification-page/verification-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { ToolsRankingPageComponent } from './tools-ranking-page/tools-ranking-page.component';
import { ReviewsFlowPageComponent } from './reviews-flow-page/reviews-flow-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewBoxComponent } from '../components/review-box/review-box.component';
import { ToolListComponent } from '../components/tool-list/tool-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
    NguCarouselModule,
    BrowserAnimationsModule,
    ScrollingModule
  ],
  declarations: [
    ToolPublishPageComponent,
    ToolPageComponent,
    ReviewPublishPageComponent,
    ReviewPageComponent,
    CommentViewComponent,
    HomePageComponent,
    ToolListPageComponent,
    ErrorPageComponent,
    AdminPageComponent,
    UserPageComponent,
    VerificationPageComponent,
    ForgotPasswordPageComponent,
    ToolsRankingPageComponent,
    ReviewsFlowPageComponent,
    ReviewBoxComponent,
    ToolListComponent
  ]
})
export class PagesModule {}
