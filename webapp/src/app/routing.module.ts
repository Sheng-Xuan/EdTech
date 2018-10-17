import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { ToolPublishPageComponent } from './pages/tool-publish-page/tool-publish-page.component';
import { ToolPageComponent } from './pages/tool-page/tool-page.component';

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
