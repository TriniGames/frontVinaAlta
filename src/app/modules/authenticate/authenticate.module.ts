import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticateEffects } from './store/authenticate.effects';
import * as fromAuthenticate from '../authenticate/store/authenticate.reducer';
import { AuthenticateRoutingModule } from './authenticate-routing.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticateRoutingModule,
    StoreModule.forFeature(fromAuthenticate.authenticateFeatureKey, fromAuthenticate.reducer),
    EffectsModule.forFeature([AuthenticateEffects])
  ]
})
export class AuthenticateModule { }
