import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { regEx } from 'src/app/shared/constants';
import { LoginInfo } from 'src/app/shared/models/authenticate/login-info.model';
import { login, storeUserInformation } from '../store/authenticate.actions';
import * as fromAuthenticate from '../store/authenticate.reducer';
import { selectUserInformation } from '../store/authenticate.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private store: Store<{ [fromAuthenticate.authenticateFeatureKey]: fromAuthenticate.State }>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.store.select(selectUserInformation).subscribe(ui => console.log({ ui }))
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(regEx.email)]],
      password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern(regEx.alphaNumeric)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(login({
      loginInfo: new LoginInfo(this.loginControls.email.value, this.loginControls.password.value, true)
    }));
  }

  get loginControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

}

