import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ToolPublishPageComponent } from './pages/tool-publish-page/tool-publish-page.component';
import { ToolPageComponent } from './pages/tool-page/tool-page.component';
import { ReviewPublishPageComponent } from './pages/review-publish-page/review-publish-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ToolListPageComponent } from './pages/tool-list-page/tool-list-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { VerificationPageComponent } from './pages/verification-page/verification-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ToolsRankingPageComponent } from './pages/tools-ranking-page/tools-ranking-page.component';
import { ReviewsFlowPageComponent } from './pages/reviews-flow-page/reviews-flow-page.component';

const routes: Routes = [
  {
    path: 'publish',
    component: ToolPublishPageComponent
  },
  {
    path: 'tool/:id',
    component: ToolPageComponent
  },
  {
    path: 'review/publish/:id',
    component: ReviewPublishPageComponent
  },
  {
    path: 'review/:id',
    component: ReviewPageComponent
  },
  {
    path: 'search/:category/:keyword',
    component: ToolListPageComponent
  },
  {
    path: '',
    component: HomePageComponent,
    data: {animation: 'home'}
  },
  {
    path: 'notfound',
    component: ErrorPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  },
  {
    path: 'user-center',
    component: UserPageComponent
  },
  {
    path: 'verification',
    component: VerificationPageComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent
  },
  {
    path: 'tools-ranking',
    component: ToolsRankingPageComponent,
    data: {animation: 'tools'}
  },
  {
    path: 'reviews',
    component: ReviewsFlowPageComponent,
    data: {animation: 'reviews'}
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
