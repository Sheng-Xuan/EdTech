import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolPublishPageComponent } from './tool-publish-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
  ],
  declarations: [ToolPublishPageComponent]
})
export class ToolPublishPageModule { }
