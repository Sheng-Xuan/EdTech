import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ToolPublishPageComponent } from './tool-publish-page/tool-publish-page.component';
import { ToolPageComponent } from './tool-page/tool-page.component';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    BarRatingModule,
  ],
  declarations: [ToolPublishPageComponent, ToolPageComponent]
})
export class PagesModule {}
