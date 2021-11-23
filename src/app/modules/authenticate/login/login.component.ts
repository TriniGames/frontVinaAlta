import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { regEx } from 'src/app/shared/constants';
import { LoginInfo } from 'src/app/shared/models/authenticate/login-info.model';
import { UserInformation } from 'src/app/shared/models/authenticate/user-information.model';
import { GetLogin } from '../store/authenticate.actions';
import { AuthenticateState } from '../store/authenticate.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Select(AuthenticateState.selectUserInformation)
  userInfomation$: Observable<UserInformation>;
  unsubscribe$ = new Subject();
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.userInfomation$.pipe(takeUntil(this.unsubscribe$)).subscribe((ui) => {
      console.log({ ui });
      if (ui && ui.jwt) {
        this.router.navigate(['/main']);
      }
    });
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(regEx.email),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern(regEx.alphaNumeric),
        ],
      ],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginInfo = new LoginInfo(
      this.loginControls.email.value,
      this.loginControls.password.value,
      true
    );

    this.store.dispatch(new GetLogin(loginInfo));
  }

  get loginControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
