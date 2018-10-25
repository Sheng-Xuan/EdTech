import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ServiceModule } from './services/service.module';
import { AppRoutingModule } from './routing.module';
import { PagesModule } from './pages/pages.module';
import { MessageService } from './services/message.service';
import { QuillModule } from 'ngx-quill';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthModalComponent,
    UserNavComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  entryComponents: [
    UserNavComponent,
    AuthModalComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ServiceModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    PagesModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
