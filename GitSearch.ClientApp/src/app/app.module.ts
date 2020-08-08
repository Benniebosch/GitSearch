import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

import { InterceptorService } from './interceptor.service'
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    TopNavComponent,
    SearchComponent,
    FavoriteComponent,

    AlertComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ], //SearchService,
  bootstrap: [AppComponent]
})
export class AppModule { }
