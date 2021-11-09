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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    MainLayoutModule,
    MatGridListModule,
    MatCardModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
