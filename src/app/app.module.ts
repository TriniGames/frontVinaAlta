import * as fromAuthenticate from '../app/modules/authenticate/store/authenticate.reducer';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor';
import { AuthenticateEffects } from './modules/authenticate/store/authenticate.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ [fromAuthenticate.authenticateFeatureKey]: fromAuthenticate.reducer }),
    EffectsModule.forRoot([AuthenticateEffects]),
    OverlayModule,
    SpinnerModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MainLayoutModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
