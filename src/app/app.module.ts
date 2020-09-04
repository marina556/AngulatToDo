import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ItemsComponent } from './home/items/items.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorInterceptor} from './core/interceptor.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AddComponent,
    EditComponent,
    ItemsComponent,
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AlertModule.forRoot(),
        FormsModule,
      ModalModule.forRoot(),
      ReactiveFormsModule,
      HttpClientModule,
    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
