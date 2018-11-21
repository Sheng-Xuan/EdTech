import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ToolPublishPageComponent } from './pages/tool-publish-page/tool-publish-page.component';
import { ToolPageComponent } from './pages/tool-page/tool-page.component';
import { ReviewPublishPageComponent } from './pages/review-publish-page/review-publish-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ToolListPageComponent } from './pages/tool-list-page/tool-list-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

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
    component: HomePageComponent
  },
  {
    path: 'notfound',
    component: ErrorPageComponent
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
